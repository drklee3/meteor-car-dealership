import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as request from "../request";

const problemState = {problems: 1};
type State = Readonly<typeof problemState>;

const problemNames = [
    "wheel fell off",
    "door fell off",
    "engine overheating",
    "coolant leak",
    "broken window",
    "engine stall",
    "dead battery",
];

export class Problems extends React.Component {
    readonly state: State = problemState;

    constructor(props: any) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
      
    private handleClick(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({
            problems: this.state.problems + 1,
        });
    }

    public render() {
        const problemFields = [];
        // create problem fields
        for (let i = 0; i < this.state.problems; i += 1) {
            problemFields.push(
                <div className="field" key={i}>
                    {
                        // check if first field
                        i === 0
                            && <label className="label">
                                {
                                    // if multiple problems use plural
                                    this.state.problems === 1
                                        ? "Problem"
                                        : `Problems (${this.state.problems})`
                                }
                            </label>
                    }
                    <div className="control is-expanded has-icons-left">
                        <input
                            className="input"
                            type="text"
                            placeholder={problemNames[i % problemNames.length]}
                            name={`binds[problems][${i}]`}
                        />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon="question" />
                        </span>
                    </div>
                    {
                        // only ask whats wrong for the last problem
                        i === this.state.problems - 1
                            ? <p className="help">What's wrong with your car?</p>
                            : null
                    }
                </div>
            );
        }

        return (
            <div className="field">
                {
                    problemFields.map(field => field)
                }
                <div className="field">
                    <button className="button is-outlined" onClick={this.handleClick}>
                        Add Another Problem
                    </button>
                </div>
            </div>
        );
    }
}

interface RepairJobStatus {
    status: "idle" | "loading" | "finished" | "error" | "require_contact";
}

type RepairJobState = Readonly<RepairJobStatus>;

class RepairJob extends React.Component {
    readonly state: RepairJobState = {status: "idle"};

    private form = React.createRef<HTMLFormElement>();

    constructor(props: any) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    private async handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        this.setState({status: "loading"});
        try {
            const res = await request.new_repair_job(this.form);
            
            // reset the form on submit
            if (this.form.current) {
                this.form.current.reset();
            }
    
            this.setState({status: "finished"});
    
            console.log(res);
        } catch (e) {
            this.setState({status: "error"});
            console.log("error submitting job: ", e);
        }
    }

    public render() {
        return (
            <div>
                <form className="form" ref={this.form}>
                    <h3 className="title is-3">Create a New Repair Job</h3>
                    <div className="field">
                        <label className="label">Name</label>
                        <p className="control is-expanded has-icons-left">
                            <input
                                name="binds[name]"
                                className="input"
                                type="text"
                                placeholder="Kimberley Chen"
                                required={true}
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </p>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <label className="label">Email</label>
                            <p className="control is-expanded has-icons-left">
                                <input
                                    name="binds[email]"
                                    className="input"
                                    type="email"
                                    placeholder="hello@dlee.dev"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="envelope" />
                                </span>
                            </p>
                            {
                                this.state.status === "require_contact"
                                && <p className="help is-error">
                                    Please provide Email and/or Phone
                                </p>
                            }
                        </div>
                        <div className="field">
                            <label className="label">Phone Number</label>
                            <p className="control is-expanded has-icons-left">
                                <input
                                    name="binds[phone]"
                                    className="input"
                                    type="tel"
                                    placeholder="123-456-7890"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="phone" />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="field">
                            <label className="label">Address</label>
                            <p className="control is-expanded has-icons-left">
                                <input
                                    name="binds[address]" 
                                    className="input"
                                    type="text"
                                    placeholder="123 maple road"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="home" />
                                </span>
                            </p>
                    </div>
                    <hr/>
                    <div className="field-body">
                        <div className="field">
                            <label className="label">License Number</label>
                            <p className="control is-expanded has-icons-left">
                                <input
                                    name="binds[licence_no]"
                                    className="input"
                                    type="text"
                                    placeholder="1ABC123"
                                    required={true}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="hashtag" />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">Car Model</label>
                            <p className="control is-expanded has-icons-left">
                                <input
                                    name="binds[model]"
                                    className="input"
                                    type="text"
                                    placeholder="Lexus LFA"
                                    required={true}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="car" />
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="field" style={{display: "none"}}>
                        <label className="label">Problems</label>
                        <div className="control is-expanded">
                            <div className="select is-multiple is-fullwidth">
                                <select name="__binds[problem][]" multiple={true} size={3}>
                                    {
                                        problemNames.map(problem => (
                                            <option value={problem} key={problem}>
                                                {problem}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <button
                            type="submit"
                            className={`button is-link ${this.state.status
                                === "loading" && "is-loading"}`}
                            onClick={this.handleSubmit}>
                            Submit
                        </button>
                        {
                            this.state.status === "error"
                                && <p className="help is-error has-text-danger">
                                        Failed to submit job
                                    </p>
                        }
                    </div>
                </form>
            </div>
        );
    }
}
    
export default RepairJob;
