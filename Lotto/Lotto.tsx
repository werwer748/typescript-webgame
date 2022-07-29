import * as React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill(null).map((v, i) => i + 1); // 배열 생성하는 거 fill(1)을 한 경우 45개의 1을 가진 배열이 생성 됨 타입스크립트 때문에 null넣음
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 이렇게 하면 앞 숫자 순이 아닌 숫자 크기대로 정렬이 됨
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); //? 메모에 타입이 제대로 안잡히면 제네릭을 사용하면 된다.
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([]); //! 빈배열은 never!!!! 제네릭으로 지정해줘야한다
    const [bonus, setBonus] = useState<number | null>(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef<number[]>([]); //? timeouts.current에 배열이 담긴다.

    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = window.setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = window.setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);
    
    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더~</button>}
        </>
    );
};

export default Lotto;
