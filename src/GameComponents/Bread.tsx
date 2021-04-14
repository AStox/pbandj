import { random } from "lodash";
import React, { ReactElement, useState } from "react";

import "./Bread.sass";

interface Props {
  sauceTop?: "peanut" | "jam" | undefined;
  sauceBottom?: "peanut" | "jam" | undefined;
  selected?: ReactElement | null;
  setSelected?(element: ReactElement | null): void;
  addSlice?(): void;
}

const Bread = (props: Props) => {
  const { sauceTop, sauceBottom, selected, setSelected, addSlice } = props;

  const [sliceRotation] = useState(random(-5, 5));
  const [topRotation] = useState(random(20, 160));
  //   const [peanutRotation] = useState(random(-5, 5));

  const handleClick = () => {
    if (selected && addSlice) {
      addSlice();
    } else {
      if (setSelected) setSelected(<Bread {...props} />);
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
        <div className="slice" style={{ rotate: `${sliceRotation}deg` }} />
      </div>
      <div
        className="absolute-container"
        style={{ rotate: `-${topRotation}deg`, top: "1rem" }}
      >
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
      <div
        className="absolute-container"
        style={{ rotate: `${topRotation}deg` }}
      >
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
    </div>
  );
};

export default Bread;
