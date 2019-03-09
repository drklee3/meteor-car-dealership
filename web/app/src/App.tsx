import * as React from "react";
import Header from "./components/Header";
import Options from "./components/Options";
import RepairJob from "./components/RepairJob";
import "./styles/App.css";
import "./Icons.ts";

class App extends React.Component {
    public render() {
        return (
            <div>
                <Header />
                <Options />
                <RepairJob />
            </div>
        );
    }
}
    
export default App;
