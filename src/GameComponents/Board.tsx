import React, { ReactElement, useState, useEffect } from "react";
import { forEach, keys, map, random, range } from "lodash";

import "./Board.sass";
import Place from "./Place";
import Bread from "./Bread";

interface Props {
  initialState: BoardState;
}

export interface BoardState {
  [id: string]: ReactElement[];
}

const Board = ({ initialState }: Props) => {
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

  const [boardSolved, setBoardSolved] = useState(false);

  useEffect(() => {
    let solved = true;
    let sandwichCount = 0;
    forEach(boardState, (sliceArray) => {
      //   check that the top and bottom of the sandwich are clean
      if (sliceArray.length) {
        sandwichCount += 1;
        if (
          sliceArray[0].props.sauceBottom ||
          sliceArray[sliceArray.length - 1].props.sauceTop
        ) {
          solved = false;
        }
        forEach(sliceArray, (slice, i) => {
          //   check that every top is paired with an opposite sauce
          if (i < sliceArray.length - 1) {
            if (slice.props.sauceTop === sliceArray[i + 1].props.sauceBottom) {
              solved = false;
            }
          }
        });
      }
    });
    if (sandwichCount > 1) solved = false;
    setBoardSolved(solved);
  }, [boardState]);

  const flipSlice = (slice: ReactElement<typeof Bread> | null) => {
    return (
      <Bread
        sauceTop={slice?.props.sauceBottom}
        sauceBottom={slice?.props.sauceTop}
        rotTop={slice?.props.rotBottom}
        rotBottom={slice?.props.rotTop}
      />
    );
  };

  const updateBoard = (id: string, changes: ReactElement[]) => {
    return setBoardState({ ...boardState, [id]: changes });
  };

  const highestId = keys(boardState).sort((a, b) => b - a)[0];
  const width = parseInt(highestId[0]) + 1;
  const height = parseInt(highestId[1]) + 1;
  console.log(height);

  return (
    <>
      {boardSolved && (
        <div className="solved-container">
          <div className="solved">SOLVED</div>
        </div>
      )}
      <div className="Board" style={{ cursor: selected ? "grabbing" : "grab" }}>
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
                  boardState={boardState}
                  setBoardState={setBoardState}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {!boardSolved && (
        <div className="tutorial-container">
          <div className="tutorial">
            {selected && "Spacebar to flip"}
            {!selected && "Click to grab"}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
