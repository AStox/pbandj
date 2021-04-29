import { random } from "lodash";
import React from "react";
import Bread from "./Bread";
import BreadDisplay from "./BreadDisplay";
import "./Legend.sass";

const Legend = () => {
  const jam = (
    <Bread
      sauceTop={"jam"}
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const peanut = (
    <Bread
      sauceTop={"peanut"}
      rotTop={random(20, 160)}
      rotBottom={random(20, 160)}
    />
  );

  const blank = <Bread rotTop={random(20, 160)} rotBottom={random(20, 160)} />;

  return (
    <div className="Legend">
      <div className="container">
        <div className="row">
          <BreadDisplay />
        </div>
      </div>
    </div>
  );
};

export default Legend;
