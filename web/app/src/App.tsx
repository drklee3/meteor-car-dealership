import * as React from "react";
import Header from "./components/Header";
import Options from "./components/Options";
import RepairJob from "./components/RepairJob";
import RepairJobListing from "./components/RepairJobListing";
import "./styles/App.css";
import "./Icons.ts";

export enum AppAction {
    NewRepairJob,
    GenerateBill,
    ShowRepairJobs,
    ShowMechanics,
}

interface AppState {
    action: AppAction;
}
const initialState = {action: AppAction.NewRepairJob};
type State = Readonly<AppState>;

class App extends React.Component {
    readonly state: State = initialState;
    
    constructor(props: any) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(action: AppAction) {
        this.setState({
            action
        });
    }

    public render() {
        return (
            <div>
                <Header />
                
                <Options click={this.handleClick} activeAction={this.state.action} />
                <div className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                {
                                    // manually chekcing for each cause im lazy bruh
                                    this.state.action === AppAction.NewRepairJob
                                        && <RepairJob />
                                }

                                {
                                    this.state.action === AppAction.GenerateBill
                                        && <p className="container">give me your money</p>
                                }

                                {
                                    this.state.action === AppAction.ShowRepairJobs
                                        && <RepairJobListing />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
    
export default App;
