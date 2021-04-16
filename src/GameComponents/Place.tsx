import { forEach, map, partial } from "lodash";
import React, { Component } from "react";
import { useEffect } from "react";
import { ReactElement } from "react";
import { BoardState } from "./Board";
import Bread from "./Bread";

import "./Place.sass";

interface Props {
  id: string;
  selected?: ReactElement | null;
  setSelected(element: ReactElement | null): Promise<ReactElement>;
  updateBoard(id: string, changes: ReactElement[]): void;
  boardState: BoardState;
  setBoardState(state: BoardState): void;
}

const Place = ({
  id,
  selected,
  setSelected,
  updateBoard,
  boardState,
  setBoardState,
}: Props) => {
  const slicesArray = boardState[id];

  const select = (index: number, element: ReactElement) => {
    return setSelected(element).then(() => {
      const arr = boardState[id];
      arr.splice(index);
      setBoardState({ ...boardState, [id]: arr });
    });
  };

  const addSlice = () => {
    if (selected) {
      updateBoard(id, [...(slicesArray || []), selected]);
      setSelected(null).catch(() => {});
    }
  };

  useEffect(() => {
    transferSauce();
  }, [slicesArray]);

  const transferSauce = () => {
    //   TODO: Add case for when sauce gets on the plate
    forEach(slicesArray, (slice, i) => {
      if (i < slicesArray.length - 1) {
        if (!slice.props.sauceTop && slicesArray[i + 1].props.sauceBottom) {
          slicesArray[i] = (
            <Bread
              {...slice.props}
              sauceTop={slicesArray[i + 1].props.sauceBottom}
            />
          );
          setBoardState({ ...boardState, [id]: slicesArray });
        }
      }
      if (i > 0) {
        if (!slice.props.sauceBottom && slicesArray[i - 1].props.sauceTop) {
          slicesArray[i] = (
            <Bread
              {...slice.props}
              sauceBottom={slicesArray[i - 1].props.sauceTop}
            />
          );
          setBoardState({ ...boardState, [id]: slicesArray });
        }
      }
    });
  };

  return (
    <div className="Place" onClick={addSlice}>
      <div className="bread-container">
        {map(slicesArray, (item, i) => (
          <div
            key={i}
            className="slice-container"
            style={{ top: `-${i * 2}rem` }}
          >
            {React.cloneElement(item, {
              selected,
              setSelected: partial(select, i),
              addSlice,
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Place;
