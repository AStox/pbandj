import React, { ReactElement, useState } from "react";
import { map, range } from "lodash";

import "./Board.sass";
import Place from "./Place";
import Bread from "./Bread";

interface Props {
  width: number;
  height: number;
}

interface BoardState {
  [id: string]: ReactElement[];
}
const peanut = <Bread sauceTop="peanut" />;
const jam = <Bread sauceTop="jam" />;
const blank = <Bread sauceBottom="jam" />;

const initialState = { "10": [peanut, blank], "01": [jam] };

const Board = ({ width, height }: Props) => {
  const [boardState, setBoardState] = useState(initialState as BoardState);

  return (
    <div className="Board">
      <div className="flex-vert">
        {map(range(height), (i: number) => (
          <div key={`hor-${i}`} className="flex-hor">
            {map(range(width), (j: number) => (
              <Place key={`${j}${i}`} bread={boardState[`${j}${i}`]} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
