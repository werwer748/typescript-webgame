import * as React from "react";
import { useCallback } from "react";
import { CLICK_CELL, clickCell } from './TicTacToe';

interface Props {
    rowIndex: number;
    cellIndex: number;
    dispatch: React.Dispatch<any>;
    cellData: string;
    children: string;
}

const Td: React.FC<Props> = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }
        // dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        dispatch(clickCell(rowIndex, cellIndex));
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;