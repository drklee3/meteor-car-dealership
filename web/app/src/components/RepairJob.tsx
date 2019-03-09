import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const problemState = {problems: 1};
type State = Readonly<typeof problemState>;

const problemNames = [
    "wheel fell off",
    "engine overheating",
    "coolant leak",
    "broken window",
    "engine stall",
    "dead battery",
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
        console.log("clicked: ", this.state.problems, [...Array(this.state.problems)]);

        [...Array(this.state.problems)].map((_, i) => {
            console.log("ay", i);
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
                            name={`[binds][problems][${i}]`}
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
            <div>
                {
                    problemFields.map(field => field)
                }
                <div className="field">
                    <button className="button is-primary" onClick={this.handleClick}>
                        Add Another Problem
                    </button>
                </div>
            </div>
        );
    }
}

class RepairJob extends React.Component {
    public render() {
        return (
            <div className="section">
                <div className="container">
                    <h3 className="title is-3">Create a New Repair Job</h3>
                    <div className="field">
                        <label className="label">Name</label>
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Rosa Parks" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </p>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <label className="label">Email</label>
                            <p className="control is-expanded has-icons-left">
                                <input className="input is-success" type="email" placeholder="hello@dlee.dev" />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="envelope" />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">Phone Number</label>
                            <p className="control is-expanded has-icons-left">
                                <input className="input" type="tel" placeholder="123-456-7890" />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="phone" />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Car Model</label>
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Lexus LFA" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon="car" />
                            </span>
                        </p>
                    </div>
                    

                    <Problems />
                </div>
           </div>
        );
    }
}
    
export default RepairJob;
