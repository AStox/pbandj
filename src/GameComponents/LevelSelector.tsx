import { map } from "lodash";
import React from "react";
import { BoardState } from "./Board";

import "./LevelSelector.sass";

interface Props {
  levelSelect(level: number): void;
  levels: BoardState[];
}

const LevelSelector = ({ levels, levelSelect }: Props) => {
  return (
    <div className="LevelSelector">
      {map(levels, (level, i) => (
        <div
          key={`level${i}`}
          className="dot"
          onClick={() => levelSelect(i)}
        ></div>
      ))}
    </div>
  );
};

export default LevelSelector;
