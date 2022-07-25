import * as React from 'react';

interface State {
    first: number,
    second: number,
    value: string,
    result: string,
}

class GuGuDanClass extends React.Component<{}, State> {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: '',
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                };
            });
            if (this.input) {
                this.input.focus();
            }
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            if (this.input) {
                this.input.focus();
            }
        }
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    input: HTMLInputElement | null = null;

    onRefInput = (c: HTMLInputElement) => { this.input = c; };

    render() {
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second}</div>
                <form onSubmit={this.onSubmit}>
                    <input
                    ref={this.onRefInput}
                    type="number"
                    value={this.state.value}
                    onChange={this.onChange}
                    />
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
};

export default GuGuDanClass;