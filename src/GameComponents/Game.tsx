import { map, mapValues } from "lodash";
import React, { useState } from "react";
import Board from "./Board";
import BoardStateGenerator from "./BoardStateGenerator";
import { JsonLevel, Level, levels as jsonLevels } from "./levels";
import LevelSelector from "./LevelSelector";

const gameModes = {
  main: "main",
  custom: "custom",
};

const Game = () => {
  const [currentMode, setCurrentMode] = useState(gameModes.main);
  const [currentLevel, setCurrentLevel] = useState(0);

  const levels: { [mode: string]: Level[] } = mapValues(jsonLevels, (mode) =>
    map(mode, (level) => BoardStateGenerator(level))
  );

  const [levelState, setLevelState] = useState(levels);

  const levelSelect = (level: number) => {
    setCurrentLevel(level);
  };

  const updateLevelState = (state: Level) => {
    const newState = {
      ...levelState,
      [currentMode]: inlineSplice(
        levelState[currentMode],
        currentLevel,
        1,
        state
      ),
    };
    setLevelState(newState);
  };

  const inlineSplice = (
    array: any[],
    index: number,
    count: number,
    replace: any
  ) => {
    array.splice(index, count, replace);
    return array;
  };

  return (
    <div>
      <LevelSelector
        levels={levelState[currentMode]}
        levelSelect={levelSelect}
      />
      <Board
        boardState={levelState[currentMode][currentLevel]}
        setBoardState={updateLevelState}
      />
    </div>
  );
};

export default Game;
