import { forEach, map } from "lodash";
import React, { useEffect, ReactElement } from "react";
import { BoardState } from "./Board";
import Bread from "./Bread";

import "./Place.sass";

interface Props {
  id: string;
  selected: ReactElement[];
  setSelected(elements: ReactElement[]): Promise<ReactElement[]>;
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

  const select = (i: number) => {
    const newArr = [...slicesArray];
    return setSelected(newArr.splice(i, newArr.length)).then(() => {
      setBoardState({ ...boardState, [id]: newArr });
    });
  };

  const addSlices = () => {
    if (selected.length) {
      updateBoard(id, [...(slicesArray || []), ...selected]);
      setSelected([]).catch(() => {});
    }
  };

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

  useEffect(() => {
    transferSauce();
  }, [slicesArray]);

  return (
    <div className="Place" onClick={addSlices}>
      <div className="bread-container">
        {map(slicesArray, (item, i) => (
          <div
            key={i}
            className="slice-container"
            style={{ top: `-${i * 2}rem` }}
          >
            {React.cloneElement(item, {
              selected,
              setSelected: () => select(i),
              addSlice: addSlices,
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Place;
