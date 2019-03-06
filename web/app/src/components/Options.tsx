import * as React from 'react';

class Options extends React.Component {
    public render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="buttons">
                        <a className="button is-primary">New Repair Job</a>
                        <a className="button is-link">Generate Customer Bill</a>
                        <a className="button is-link">Show Repair Jobs</a>
                        <a className="button is-link">Show Mechanic</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Options;
