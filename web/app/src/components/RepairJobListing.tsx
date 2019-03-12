import * as React from "react";
import * as request from "../request";

interface JobListingItem {
    model: string;
    repair_id: string;
    description: string;
    mechanic: string;
}

export type RepairJobListingState = {
    repairJobs: JobListingItem[];
    status: "idle" | "loading" | "finished" | "error" | "require_contact";
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
};

class RepairJobListing extends React.Component<any, RepairJobListingState> {
    readonly state: RepairJobListingState = {
        repairJobs: [], // initial none
        status: "idle",
        start_date: "2019-02-20",
        start_time: "00:00:00",
        end_date:   "2019-03-14",
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
    
            this.setState({status: "finished"});
    
            console.log(res);
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
                                    defaultValue="2019-02-20"
                                />
                                <input
                                    onChange={this.handleStartTimeChange}
                                    type="time"
                                    name="binds[start_time]"
                                    defaultValue="00:00:00"
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
                                    defaultValue="2019-03-14"
                                />
                                <input
                                    onChange={this.handleEndTimeChange}
                                    type="time"
                                    name="binds[end_time]"
                                    defaultValue="23:59:59"
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
                        <th>Description</th>
                        <th>Mechanic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.repairJobs.map(job => (
                                <tr>
                                    <td>{job.model}</td>
                                    <td>{job.repair_id}</td>
                                    <td>{job.description}</td>
                                    <td>{job.mechanic}</td>
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

