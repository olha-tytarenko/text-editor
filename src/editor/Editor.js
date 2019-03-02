import React, { Component } from 'react';

import ControlPanel from '../control-panel/ControlPanel';
import { getIndixesOf, replaceAt } from '../helpers';

import getMockText from '../text.service';

import './Editor.css';

class Editor extends Component {
    state = {
        textAsHTML: '',
    }

    componentDidMount() {
        getMockText().then(text => {
            this.setState({
                textAsHTML: text,
            })
        });
    }

    addFormatting = (formattingType) => {
        const selectedWordObject = window.getSelection();
        const word = selectedWordObject.toString();
        const parentNode = document.getElementById('file');
        const formattedElement = Array.from(document.getElementsByTagName(formattingType));
        const formattedWords = formattedElement.map(node => node.innerText);
        const positionToReplacement = {
            start: selectedWordObject.anchorOffset,
            end: selectedWordObject.focusOffset,
        };

        if (formattedWords.includes(word)) {
            const nodeIndex = formattedWords.indexOf(word);
            const node = formattedElement[nodeIndex];
            const textNode = document.createTextNode(word);
            node.parentNode.replaceChild(textNode, node);
        } else {
            const childNodes = Array.from(parentNode.childNodes);

            if (childNodes.length > 1) {
                const childIntoText = childNodes.map(node => node.innerText || node.nodeValue);

                let textWithSelectedWord = childIntoText.filter((text) => {
                    return text.includes(word) && getIndixesOf(word, text).includes(positionToReplacement.start);
                })[0];
    
                const childIndex = childIntoText.findIndex(text => text === textWithSelectedWord);

                textWithSelectedWord = childNodes[childIndex].outerHTML || textWithSelectedWord;
    
                const newStr = childNodes[childIndex].outerHTML
                    ? 
                        `<${formattingType}>${textWithSelectedWord}</${formattingType}>`
                    : 
                        replaceAt(textWithSelectedWord, `<${formattingType}>${word}</${formattingType}>`, positionToReplacement);
                childNodes[childIndex] = newStr;

                this.setState({
                    textAsHTML: childNodes.map(node => node.nodeValue || node.outerHTML || node).join(''),
                });
            } else {
                const newStr = replaceAt(this.state.textAsHTML, `<${formattingType}>${word}</${formattingType}>`, positionToReplacement);

                this.setState({
                    textAsHTML: newStr,
                })
            }

        }
    };

    handleFormatButtonClick = (formatter) => {
        this.addFormatting(formatter);
    };

    render() {
        const { textAsHTML } = this.state;

        return (
            <div id="file-zone">
                <ControlPanel handleFormatButtonClick={this.handleFormatButtonClick} />
                <div
                    id="file"
                    onDoubleClick={this.doubleClickHandler}
                    dangerouslySetInnerHTML={{__html: textAsHTML}}    
                >
                </div>
            </div>
        );
    }
}

export default Editor;
