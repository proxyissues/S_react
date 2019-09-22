import React from "react";
import { RateMap } from "./store";

interface Props {
  rates?: RateMap;
}

/**
 * Data table rendering of exchange rates
 * @param param0
 */
export const DataTable: React.FC<Props> = ({ rates }) => {
  if (!rates) {
    return null;
  }
  const info = Object.keys(rates).sort();
  return (
    <div className="data-table">
      {info.map(key => {
        return (
          <>
            <div>{key}</div>
            <div>{rates[key]}</div>
          </>
        );
      })}
    </div>
  );
};
