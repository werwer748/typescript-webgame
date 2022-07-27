import * as React from "react";
import { TryInfo } from './types';

const Try: React.FC<{ tryInfo: TryInfo}> = ({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
};

export default Try;