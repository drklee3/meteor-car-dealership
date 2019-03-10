import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as request from "../request";

const problemState = {problems: 1};
type State = Readonly<typeof problemState>;

const problemNames = [
    "wheel fell off",
    "door fell off",
    "you fell off",
    "sounds like a personal problem",
    "engine overheating",
    "coolant leak",
    "broken window",
    "engine stall",
    "dead battery",
    "i want to die"
];

class Problems extends React.Component {
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
    status: "idle" | "loading" | "finished" | "require_contact";
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
        const res = await request.new_repair_job(this.form);

        // reset the form on submit
        if (this.form.current) {
            this.form.current.reset();
        }

        this.setState({status: "finished"});

        console.log(res);
    }

    public render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <form className="form" ref={this.form}>
                                <h3 className="title is-3">Create a New Repair Job</h3>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <p className="control is-expanded has-icons-left">
                                        <input
                                            name="binds[name]"
                                            className="input"
                                            type="text"
                                            placeholder="Rosa Parks"
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
                                                name="binds[license]"
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
                                
                                <div className="field">
                                    <label className="label">Problems</label>
                                    <p className="control is-expanded">
                                        <div className="select is-multiple is-fullwidth">
                                            <select name="binds[problem_][]" multiple={true} size={3}>
                                                {
                                                    problemNames.map(problem => (
                                                        <option value={problem} key={problem}>
                                                            {problem}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </p>
                                </div>

                                <Problems />

                                <div className="field">
                                    <button
                                        className={`button is-link ${this.state.status
                                            === "loading" && "is-loading"}`}
                                        onClick={this.handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}
    
export default RepairJob;
