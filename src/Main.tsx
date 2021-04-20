import { random } from "lodash";
import React from "react";
import Board from "./GameComponents/Board";
import Bread from "./GameComponents/Bread";

import "./Main.sass";

const Main = () => {
  const blank = <Bread rotTop={random(20, 160)} rotBottom={random(20, 160)} />;
  const peanut = (
    <Bread
      sauceTop="peanut"
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );
  const jam = (
    <Bread
      sauceTop="jam"
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );
  const double = (
    <Bread
      sauceTop="peanut"
      sauceBottom="jam"
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const peanutTop = (
    <Bread
      sauceTop="peanut"
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const peanutBottom = (
    <Bread
      sauceBottom="peanut"
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  // const initialState = {
  //   "00": [peanut, blank],
  //   "10": [jam, blank],
  // };

  const initialState = {
    "00": [peanut],
    "10": [jam],
  };

  return <Board initialState={initialState} />;
};

export default Main;
