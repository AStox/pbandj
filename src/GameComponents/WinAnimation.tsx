import { initial, map, random } from "lodash";
import React, { ReactElement, useState } from "react";
import { useEffect } from "react";
import { pixelsToRem } from "../utils";
import Bread from "./Bread";

import "./WinAnimation.sass";

interface Props {
  dir: number;
  initialPos: number[];
}

const WinAnimation = ({ dir }: Props) => {
  const bread = (
    <Bread
      sauceTop={"peanut"}
      sauceBottom={"jam"}
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const [breadArr, setBreadArr] = useState([[]] as ReactElement[][]);
  const [initialPos, setInitialPos] = useState([
    [random(0, pixelsToRem(window.screen.availWidth) - 17), random(-10, 10)],
  ]);

  useEffect(() => {
    if (breadArr.length < 15) {
      if (breadArr[breadArr.length - 1].length < 50) {
        let newArr = [...breadArr];
        newArr[newArr.length - 1] = [...breadArr[breadArr.length - 1], bread];
        setTimeout(() => {
          if (
            height(newArr[newArr.length - 1].length) >
            distToBottom(initialPos[initialPos.length - 1])
          ) {
            setInitialPos([
              ...initialPos,
              [
                random(0, pixelsToRem(window.screen.availWidth) - 17),
                random(-10, 10),
              ],
            ]);
            setBreadArr([...breadArr, []]);
          } else {
            setBreadArr(newArr);
          }
        }, 50);
      }
    }
  }, [breadArr]);

  const accel = 0.05;

  const distToBottom = (initialPos: number[]) =>
    pixelsToRem(window.screen.availHeight - initialPos[1]);
  const direction = (i: number) => {
    return initialPos[i][0] > pixelsToRem(window.screen.availWidth) / 2
      ? dir * -1
      : dir;
  };
  const height = (i: number) => {
    const vel = accel * i;
    const dist = vel * i;
    return dist;
  };

  return (
    <div className="WinAnimation">
      {map(breadArr, (arr, i) => (
        <div
          key={i}
          className="place"
          style={{
            top: `${initialPos[i][1]}rem`,
            left: `${initialPos[i][0]}rem`,
          }}
        >
          <div className="bread-container">
            {map(arr, (bread, j) => (
              <div
                key={j}
                className="slice-container"
                style={{
                  top: `${height(j)}rem`,
                  left: `${direction(i) * j}rem`,
                }}
              >
                {bread}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinAnimation;
