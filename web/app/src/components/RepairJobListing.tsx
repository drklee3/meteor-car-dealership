import * as React from "react";
import * as request from "../request";

interface JobListingItem {
    MODEL: string;
    REPAIR_ID: string;
    NAME: string;
}

interface JobListing {
    num_rows: number;
    result: string;
    rows: JobListingItem[];
}

export type RepairJobListingState = {
    repairJobs?: JobListing;
    status: "idle" | "loading" | "finished" | "error" | "require_contact";
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
};

class RepairJobListing extends React.Component<any, RepairJobListingState> {
    readonly state: RepairJobListingState = {
        repairJobs: undefined, // initial none
        status: "idle",
        start_date: "2019-01-20",
        start_time: "00:00:00",
        end_date:   "2019-05-20",
        end_time: "23:59:59",
    };

    private form = React.createRef<HTMLFormElement>();

    constructor(props: any) {
        super(props);
    
        this.handleSubmit      = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDateChange   = this.handleEndDateChange.bind(this);
        this.handleEndTimeChange   = this.handleEndTimeChange.bind(this);
    }
    
    private async handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({status: "loading"});
        try {
            const res = await request.get_repair_jobs(this.state);
            // reset the form on submit
            if (this.form.current) {
                this.form.current.reset();
            }
            
            console.log(res);
    
            this.setState({
                status: "finished",
                repairJobs: res.data
            });
    
        } catch (e) {
            this.setState({status: "error"});
            console.log("error fetching jobs: ", e);
        }

    }

    private handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("start date changed: ", e.target.value);
        this.setState({start_date: e.target.value});
    }

    private handleStartTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("start time changed: ", e.target.value);
        this.setState({start_time: e.target.value});
    }

    private handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("end date changed: ", e.target.value);
        this.setState({end_date: e.target.value});
    }

    private handleEndTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("end time changed: ", e.target.value);
        this.setState({end_time: e.target.value});
    }

    public render() {
        return (
            <div>
                <form ref={this.form}>
                    <div className="field-body">
                        <div className="field">
                            <label className="label">Start Date</label>
                            <p className="control is-expanded">
                                <input
                                    onChange={this.handleStartDateChange}
                                    type="date"
                                    name="binds[start_date]"
                                    required={true}
                                    defaultValue="2019-01-20"
                                />
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">End Date</label>
                            <p className="control is-expanded">
                                <input
                                    onChange={this.handleEndDateChange}
                                    type="date"
                                    name="binds[end_date]"
                                    required={true}
                                    defaultValue="2019-05-20"
                                />
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div className="field">
                        <button
                            className={`button is-link ${this.state.status
                                === "loading" && "is-loading"}`}
                            onClick={this.handleSubmit}>
                            Get Repair Jobs
                        </button>
                        {
                            this.state.status === "error"
                                && <p className="help is-error has-text-danger">
                                        Failed to fetch jobs
                                    </p>
                        }
                    </div>
                </form>
                <br/>
                <table className="table is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th>Model</th>
                        <th>Repair ID</th>
                        <th>Mechanic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.repairJobs
                            && this.state.repairJobs.rows.map(job => (
                                <tr key={job.REPAIR_ID}>
                                    <td>{job.REPAIR_ID}</td>
                                    <td>{job.MODEL}</td>
                                    <td>{job.NAME}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RepairJobListing;

