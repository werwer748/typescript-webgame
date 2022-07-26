import * as React from 'react';
import { Component, createRef } from 'react';

interface State {
    word: string,
    value: string,
    result: string,
}

class WordRelayClass extends Component<{}, State> {
    state = {
        word: '소주',
        value: '',
        result: '',
    };

    onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const input = this.onRefInput.current;
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            if (input) {
                input.focus();
            }
        } else {
            this.setState({
                result: '땡!',
                value: '',
            });
            if (input) {
                input.focus();
            }
        }
    };

    onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.currentTarget.value,
        });
    };

    onRefInput = createRef<HTMLInputElement>();

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input
                    ref={this.onRefInput}
                    value={this.state.value}
                    onChange={this.onChangeInput}
                    />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default WordRelayClass;