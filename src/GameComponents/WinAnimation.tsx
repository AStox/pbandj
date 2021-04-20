import { map, random } from "lodash";
import React, { ReactElement, useState } from "react";
import { useEffect } from "react";
import { pixelsToRem } from "../utils";
import Bread from "./Bread";

import "./WinAnimation.sass";

interface Props {
  timeout: number;
}

const WinAnimation = ({ timeout }: Props) => {
  const peanut = (
    <Bread
      sauceTop={"peanut"}
      sauceBottom={"jam"}
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const jam = (
    <Bread
      sauceTop={"jam"}
      sauceBottom={"peanut"}
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const initialPosCalc = () => [
    random(0, pixelsToRem(window.screen.availWidth) - 17),
    random(pixelsToRem(window.screen.availHeight) - 17, 0),
  ];

  const dirCalc = () => random(0.5, 2.5);

  const [breadArr, setBreadArr] = useState([[]] as ReactElement[][]);
  const [initialPos, setInitialPos] = useState([initialPosCalc()]);
  const [dir, setDir] = useState([dirCalc()]);
  const initialVel = map(
    initialPos,
    (pos) => (pos[1] / pixelsToRem(window.screen.availHeight)) * 4
  );

  useEffect(() => {
    if (breadArr.length < 5) {
      let newArr = [...breadArr];
      if (random(0, 1) > 0.5) {
        newArr[newArr.length - 1] = [...breadArr[breadArr.length - 1], peanut];
      } else {
        newArr[newArr.length - 1] = [...breadArr[breadArr.length - 1], jam];
      }
      setTimeout(() => {
        if (
          height(newArr[newArr.length - 1].length, newArr.length - 1) >
          distToBottom(initialPos[initialPos.length - 1])
        ) {
          setDir([...dir, dirCalc()]);
          setInitialPos([...initialPos, initialPosCalc()]);
          setBreadArr([...breadArr, []]);
        } else {
          setBreadArr(newArr);
        }
      }, timeout);
    }
  }, [breadArr]);

  const accel = 0.05;

  const distToBottom = (initialPos: number[]) =>
    pixelsToRem(window.screen.availHeight - initialPos[1]);
  const direction = (i: number) => {
    return initialPos[i][0] > pixelsToRem(window.screen.availWidth) / 2
      ? dir[i] * -1
      : dir[i];
  };
  const height = (slice: number, stream: number) => {
    console.log(slice);
    const vel = accel * slice;
    const dist = (vel - initialVel[stream]) * slice;
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
                  top: `${height(j, i)}rem`,
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
