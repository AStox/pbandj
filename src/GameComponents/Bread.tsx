import { random } from "lodash";
import React, { ReactElement, useState } from "react";

import "./Bread.sass";

interface Props {
  sauceTop?: "peanut" | "jam" | undefined;
  sauceBottom?: "peanut" | "jam" | undefined;
  selected: ReactElement[];
  setSelected?(): Promise<ReactElement[]>;
  addSlice?(): void;
  rotTop?: number;
  rotBottom?: number;
}

const Bread = (props: Props) => {
  const {
    sauceTop,
    sauceBottom,
    selected,
    setSelected,
    addSlice,
    rotTop,
  } = props;

  const [rotSlice] = useState(random(-5, 5));

  const handleClick = () => {
    if (selected.length && addSlice) {
      addSlice();
    } else if (setSelected) {
      setSelected().catch(() => {});
    }
  };

  return (
    <div className="Bread" onClick={handleClick}>
      <div
        className="absolute-container behind"
        style={{ rotate: "5deg", width: "110%", left: "-1.5rem" }}
      >
        {sauceBottom === "peanut" && <div className="peanut" />}
        {sauceBottom === "jam" && <div className="jam" />}
      </div>
      <div
        className="absolute-container behind"
        style={{ rotate: "-5deg", width: "110%" }}
      >
        {sauceBottom === "peanut" && <div className="peanut" />}
        {sauceBottom === "jam" && <div className="jam" />}
      </div>
      <div className="absolute-container">
        <div className="slice" style={{ rotate: `${rotSlice}deg` }} />
      </div>
      <div
        className="absolute-container"
        style={{ rotate: `-${rotTop}deg`, top: "1rem" }}
      >
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
      <div className="absolute-container" style={{ rotate: `${rotTop}deg` }}>
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
      <div className="absolute-container" style={{ rotate: `${rotSlice}deg` }}>
        <div className="shadow" />
      </div>
    </div>
  );
};

export default Bread;
