import * as React from "react";
import {AppAction} from "../App";

type OptionProps = {
    name: string;
    action: AppAction;
    click: Function;
    classes?: string;
    activeAction: AppAction;
};

class Option extends React.Component<OptionProps> {
    constructor(props: OptionProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        this.props.click(this.props.action);
    }
    public render() {
        let classStr = "";
        if (this.props.classes) {
            classStr = this.props.classes;
        }

        if (this.props.activeAction === this.props.action) {
            classStr += " is-link";
        }

        return (
            <a
                className={`button ${classStr}`}
                onClick={this.handleClick}
            >
                {this.props.name}
            </a>  
        );
    }
}

type OptionsProps = {
    click: Function;
    activeAction: AppAction;
};

class Options extends React.Component<OptionsProps> {
    public render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter buttons">
                            <Option
                                name="New Repair Job"
                                click={this.props.click}
                                action={AppAction.NewRepairJob}
                                activeAction={this.props.activeAction}
                            />
                            <Option
                                name="Generate Bill"
                                click={this.props.click}
                                action={AppAction.GenerateBill}
                                activeAction={this.props.activeAction}
                            />
                            <Option
                                name="Show Repair Jobs"
                                click={this.props.click}
                                action={AppAction.ShowRepairJobs}
                                activeAction={this.props.activeAction}
                            />
                            <Option
                                name="Show Mechanics"
                                click={this.props.click}
                                action={AppAction.ShowMechanics}
                                activeAction={this.props.activeAction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Options;
