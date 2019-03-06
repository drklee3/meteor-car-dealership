import * as React from 'react';
import Header from './components/Header';
import Options from './components/Options';
import './styles/App.css';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Header />
                
                <Options />
            </div>
        );
    }
}
    
export default App;
