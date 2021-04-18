import React, {
  ReactElement,
  useState,
  useEffect,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import { forEach, keys, map, range } from "lodash";

import Place from "./Place";
import Bread from "./Bread";

import "./Board.sass";

interface Props {
  initialState: BoardState;
}

export interface BoardState {
  [id: string]: ReactElement[];
}

const Board = ({ initialState }: Props) => {
  const [selected, setSelected] = useState([] as ReactElement[]);

  const select = (elements: ReactElement[]) => {
    return new Promise<ReactElement[]>((resolve, reject) => {
      if (selected.length) {
        reject(elements);
      }
      setSelected(elements);
      resolve(elements);
    });
  };

  const [curPos, setCurPos] = useState([0, 0]);

  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, [selected]);

  const followCursor: MouseEventHandler<HTMLDivElement> = (e) => {
    setCurPos([e.pageX, e.pageY]);
  };

  const [boardState, setBoardState] = useState(initialState as BoardState);

  const [boardSolved, setBoardSolved] = useState(false);

  useEffect(() => {
    let solved = true;
    let sandwichCount = 0;
    if (selected.length) {
      solved = false;
    }
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

  const flipSlice = (slices: ReactElement<typeof Bread>[] | null) => {
    const newArray: ReactElement[] = [];
    forEach(slices, (slice) => {
      newArray.push(
        <Bread
          sauceTop={slice?.props.sauceBottom}
          sauceBottom={slice?.props.sauceTop}
          rotTop={slice?.props.rotBottom}
          rotBottom={slice?.props.rotTop}
          selected={selected}
        />
      );
    });
    return newArray.reverse();
  };

  const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === " ") {
      setSelected(flipSlice(selected));
    }
  };

  const updateBoard = (id: string, changes: ReactElement[]) => {
    return setBoardState({ ...boardState, [id]: changes });
  };

  const highestId = keys(boardState).sort((a, b) => b - a)[0];
  const width = parseInt(highestId[0], 10) + 1;
  const height = parseInt(highestId[1], 10) + 1;

  return (
    <>
      {boardSolved && (
        <div className="solved-container">
          <div className="solved">SOLVED</div>
        </div>
      )}
      <div
        className="Board"
        style={{ cursor: selected ? "grabbing" : "grab" }}
        onMouseMove={followCursor}
      >
        <div
          className="selection"
          style={{ top: curPos[1] + 1, left: curPos[0] + 1 }}
        >
          <div className="bread-container">
            {selected.map((slice, i) => (
              <div
                key={`selection-${i}`}
                className="slice-container"
                style={{ top: `-${i * 2}rem` }}
              >
                {slice}
              </div>
            ))}
          </div>
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
            {!!selected.length && (
              <div className="tutorial" style={{ rotate: "-2deg" }}>
                Spacebar to flip
              </div>
            )}
            {!!!selected.length && (
              <div className="tutorial" style={{ rotate: "2deg" }}>
                Click to grab
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
