import React from "react";
import Game from "./GameComponents/Game";

import "./Main.sass";

const Main = () => {
  return (
    <div data-testid="Main">
      <Game />
    </div>
  );
};

export default Main;
