import React, { ReactElement, useState, useEffect } from "react";
import { map, range } from "lodash";

import "./Board.sass";
import Place from "./Place";
import Bread from "./Bread";
import { useMemo } from "react";
import { useCallback } from "react";

interface Props {
  width: number;
  height: number;
}

export interface BoardState {
  [id: string]: ReactElement[];
}
const peanut = <Bread sauceTop="peanut" />;
const jam = <Bread sauceTop="jam" />;
const double = <Bread sauceTop="peanut" sauceBottom="jam" />;

const initialState = { "10": [peanut, double, jam, double], "01": [jam] };

const Board = ({ width, height }: Props) => {
  const [selected, setSelected] = useState(null as ReactElement | null);

  const select = (element: ReactElement) => {
    return new Promise<ReactElement>((resolve, reject) => {
      if (selected) {
        reject(element);
      }
      setSelected(element);
      resolve(element);
    });
  };

  const [curPos, setCurPos] = useState([0, 0]);

  useEffect(() => {
    addEventListener("mousemove", followCursor);
    addEventListener("keydown", handleKeydown);
    return () => {
      removeEventListener("mousemove", followCursor);
      removeEventListener("keydown", handleKeydown);
    };
  }, [selected]);

  useEffect(() => {
    addEventListener("mousemove", followCursor);
    return () => {
      removeEventListener("mousemove", followCursor);
    };
  }, []);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key == " ") {
      setSelected(flipSlice(selected));
    }
  };

  const followCursor = (e: MouseEvent) => {
    setCurPos([e.pageX, e.pageY]);
  };

  const [boardState, setBoardState] = useState(initialState as BoardState);

  const flipSlice = (slice: ReactElement<typeof Bread> | null) => {
    console.log(slice.props.sauceTop);
    const top = slice?.props.sauceTop;
    const bottom = slice?.props.sauceBottom;
    return <Bread sauceTop={bottom} sauceBottom={top} />;
  };

  const updateBoard = (id: string, changes: ReactElement[]) => {
    setBoardState({ ...boardState, [id]: changes });
  };

  return (
    <>
      <div className="Board">
        <div
          className="selection"
          style={{ top: curPos[1] + 1, left: curPos[0] + 1 }}
        >
          {selected}
        </div>
        <div className="flex-vert">
          {map(range(height), (i: number) => (
            <div key={`hor-${i}`} className="flex-hor">
              {map(range(width), (j: number) => (
                <Place
                  id={`${j}${i}`}
                  key={`${j}${i}`}
                  selected={selected}
                  setSelected={select}
                  updateBoard={updateBoard}
                  bread={boardState[`${j}${i}`]}
                  boardState={boardState}
                  setBoardState={setBoardState}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
