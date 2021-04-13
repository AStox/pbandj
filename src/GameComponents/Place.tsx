import { map, partial } from "lodash";
import React, { Component } from "react";
import { ReactElement } from "react";
import { BoardState } from "./Board";

import "./Place.sass";

interface Props {
  id: string;
  bread: ReactElement[];
  selected?: ReactElement | null;
  setSelected(element: ReactElement | null): Promise<ReactElement>;
  updateBoard(id: string, changes: ReactElement[]): void;
  boardState: BoardState;
  setBoardState(state: BoardState): void;
}

const Place = ({
  id,
  bread,
  selected,
  setSelected,
  updateBoard,
  boardState,
  setBoardState,
}: Props) => {
  const select = (index: number, element: ReactElement) => {
    setSelected(element).then(() => {
      const arr = boardState[id];
      arr.splice(index);
      setBoardState({ ...boardState, [id]: arr });
    });
  };

  const addSlice = () => {
    if (selected) {
      console.log(bread);
      updateBoard(id, [...(bread || []), selected]);
      setSelected(null);
    }
  };

  return (
    <div className="Place" onClick={addSlice}>
      <div className="bread-container">
        {map(bread, (item, i) => (
          <div className="slice-container" style={{ top: `-${i * 3}rem` }}>
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
