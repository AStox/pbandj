import React, { useState } from "react";
import { map, range } from "lodash";

import "./Board.sass";
import Place from "./Place";
import Bread from "./Bread";

interface Props {
  width: number;
  height: number;
}

interface BoardState {
  [id: number]: "peanut" | "jam";
}
const bread = (i: number, j: number, boardState: BoardState) => (
  <Bread sauce={boardState[parseInt(`${i}${j}`)]} />
);

const initialState = { 11: "peanut" };

const Board = ({ width, height }: Props) => {
  const [boardState, setBoardState] = useState(initialState as BoardState);

  return (
    <div className="Board">
      <div className="flex-vert">
        {map(range(height), (i: number) => (
          <div key={`hor-${i}`} className="flex-hor">
            {map(range(width), (j: number) => (
              <Place key={`${i}${j}`} bread={bread(i, j, boardState)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
