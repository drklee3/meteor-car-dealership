import * as React from "react";
import * as request from "../request";

interface JobListingItem {
    model: string;
    repair_id: string;
    description: string;
    mechanic: string;
}

type RepairJobListingState = {
    repairJobs: JobListingItem[];
    status: "idle" | "loading" | "finished" | "error" | "require_contact";
    start_date: number;
    end_date: number;
};

class RepairJobListing extends React.Component<any, RepairJobListingState> {
    readonly state: RepairJobListingState = {
        repairJobs: [], // initial none
        status: "idle",
        start_date: 1550620800000,
        end_date:   1552521600000,
    };

    private form = React.createRef<HTMLFormElement>();

    constructor(props: any) {
        super(props);
    
        this.handleSubmit      = this.handleSubmit.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange   = this.handleEndChange.bind(this);
    }
    
    private async handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({status: "loading"});
        try {
            const res = await request.get_repair_jobs(this.state.start_date, this.state.end_date);
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

    private dateToTimeStamp(e: React.ChangeEvent<HTMLInputElement>): number {
        const date = new Date(e.target.value);
        return date.getTime();
    }

    private handleStartChange(e: React.ChangeEvent<HTMLInputElement>) {
        const time = this.dateToTimeStamp(e);
        console.log("start date changed: ", time);
        this.setState({start_date: time});
    }

    private handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
        const time = this.dateToTimeStamp(e);
        console.log("end date changed: ", time);
        this.setState({end_date: time});
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
                                    onChange={this.handleStartChange}
                                    type="date"
                                    name="binds[start_date]"
                                    required={true}
                                    value="2019-02-20"
                                />
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">End Date</label>
                            <p className="control is-expanded">
                                <input
                                    onChange={this.handleEndChange}
                                    type="date"
                                    name="binds[end_date]"
                                    required={true}
                                    value="2019-03-14"
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

