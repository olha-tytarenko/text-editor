import React, { Component } from 'react';
import './ControlPanel.css';

const FOMATTERS = {
    BOLD: 'b',
    ITALIC: 'i',
    UNDERLINE: 'u',
}

class ControlPanel extends Component {
    render() {
        const { handleFormatButtonClick } = this.props;

        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button className="format-action" type="button" onClick={() => handleFormatButtonClick(FOMATTERS.BOLD)}><b>B</b></button>
                    <button className="format-action" type="button" onClick={() => handleFormatButtonClick(FOMATTERS.ITALIC)}><i>I</i></button>
                    <button className="format-action" type="button" onClick={() => handleFormatButtonClick(FOMATTERS.UNDERLINE)}><u>U</u></button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
