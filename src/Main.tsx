import { initial, random } from "lodash";
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

  const initialState = { "00": [jam], "10": [peanut], "01": [], "11": [] };

  return <Board initialState={initialState} />;
};

export default Main;
