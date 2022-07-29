import * as React from 'react';
import { TableContext } from './MineSearch';
import { useContext } from 'react';
import Td from './Td';

interface Props {
    row
}

const Tr = () => {
    const { tableData } = useContext(TableContext);

    return (
        <table>
            {Array(tableData.length).fill(null).map((tr, i) => <Td rowIndex={i} />)}
        </table>
    );
};

export default Tr;