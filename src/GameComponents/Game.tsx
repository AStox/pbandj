import React, { useState } from "react";
import Board from "./Board";
import BoardStateGenerator from "./BoardStateGenerator";
import levels from "./levels";

const gameModes = {
  main: "main",
  custom: "custom",
};

const Game = () => {
  const [currentMode, setCurrentMode] = useState(gameModes.main);
  const [currentLevel, setCurrentLevel] = useState(0);
  //   const mainLevels = levels.main;
  //   const custom = levels.custom;
  return (
    <div>
      <Board
        initialState={BoardStateGenerator(levels[currentMode][currentLevel])}
      />
    </div>
  );
};

export default Game;
