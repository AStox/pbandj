import { map } from "lodash";
import React, { Component } from "react";
import { ReactElement } from "react";

import "./Place.sass";

interface Props {
  bread?: ReactElement[];
}

const Place = ({ bread }: Props) => {
  return (
    <div className="Place">
      <div className="bread-container">
        {map(bread, (item, i) => (
          <div className="slice-container" style={{ top: `-${i * 3}rem` }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Place;
