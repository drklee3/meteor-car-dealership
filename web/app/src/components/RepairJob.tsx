import * as React from 'react';

class RepairJob extends React.Component {
    public render() {
        return (
            <div>
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="Input" />
                    </div>
                </div>
            
                <div className="field">
                    <p className="control">
                        <span className="select">
                            <select>
                                <option>Create Rep</option>
                            </select>
                        </span>
                    </p>
                </div>
           </div>
        )
    }
}
    
export default RepairJob;
