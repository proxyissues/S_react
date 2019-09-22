import React from 'react';
import { RateMap } from "./store";

interface Props {
    rates?: RateMap;
}
interface Row {
    a: string;
    b: number;
}

export const DataTable: React.FC<Props> = ({rates = {}}) => {
    const info = Object.keys(rates).sort();
    return (
        <div className="data-table">
            {info.map((key) => {
                return <><div>{key}</div><div>{rates[key]}</div></>
            })}
        </div>
    );
};