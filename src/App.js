import React, {Component} from 'react';
import './App.css';
import Editor from './editor/Editor';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <Editor/>
                </main>
            </div>
        );
    }
}

export default App;
