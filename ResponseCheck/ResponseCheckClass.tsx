import * as React from 'react';
import { Component, createRef, useCallback } from 'react';

interface State {
    state: 'waiting' | 'now' | 'ready';
    message: string;
    result: number[];
}

class ResponseCheckClass extends Component<{}, State> {
    state: State = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout: number | null = null;
    startTime: number | null = null;
    endTime: number | null = null;

    onReset = () => {
        this.setState({
            result: [],
        });
    };

    renderAverage = () => {
        return this.state.result.length === 0 ? null
        : <>
            <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
    };

    onClickScreen = () => {
        const { state } = this.state;
        if (state === 'waiting') {
            this.timeout = window.setTimeout(() => { // nodejs setTimeout으로 인식해서 오류가 난다.
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date().getTime();
            }, Math.floor(Math.random() * 1000) + 2000); // as unknown as number
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
        } else if (state === 'ready') {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            });
        } else if (state === 'now') {
            this.endTime = new Date().getTime();
            this.setState((prevResult) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevResult.result, this.endTime! - this.startTime!],
                };
            });
        }
    };

    render() {
        const { state, message} = this.state;
    
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheckClass;