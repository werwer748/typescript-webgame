import * as React from 'react';
import { useState, useCallback, useContext, memo } from 'react';
import { startGame } from './action';
import { TableContext } from './MineSearch';

const Form = () => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRow(Number(e.target.value));
    }, [row]);

    const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCell(Number(e.target.value));
    }, [cell]);

    const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMine(Number(e.target.value));
    }, [mine]);

    const onClickBtn = useCallback(() => {
        dispatch(startGame(row, cell, mine));
    }, [row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder='세로' value={row} onChange={onChangeRow} />
            <input type="number" placeholder='가로' value={cell} onChange={onChangeCell} />
            <input type="number" placeholder='지뢰' value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
}

export default memo(Form); // 예시로 만든것 프롭스가 자주 바뀌어야하는경우 사용하는것이 바람직하다