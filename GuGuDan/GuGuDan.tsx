import * as React from "react";
import { useState } from "react";

//? <> === React.Fragment
const GuGuDan = () => {
    //! 타입스크립트가 타입추론을 못할시 제네릭을 쓴다!!
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9)); // React.useState
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9)); // React.useState
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = React.useRef<HTMLInputElement>(null); // 제너릭을 써줘야 값을 

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputEl.current;
        if (parseInt(value) === first * second) { // 정답일 경우
            setResult('정답!');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            // input!.focus(); //* !는 값이 있다는 확신이 있을때 사용
            if (input) {
                input.focus();
            }
        } else {
            setResult('땡!');
            setValue('');
            if (input) {
                input.focus();
            }
        }
    }

    return (
        <>
            <div>{first} 곱하기 {second}</div>
            <form onSubmit={onSubmitForm}>
                <input
                ref={inputEl}
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
            </form>
            <div>{result}</div>
        </>
    );
};

export default GuGuDan;