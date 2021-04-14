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

  const [rotation, _] = useState(random(-2, 2));

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
        <div className="slice" style={{ rotate: `${rotation}deg` }} />
      </div>
      <div
        className="absolute-container"
        style={{ rotate: "5deg", top: "1rem" }}
      >
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
      <div className="absolute-container" style={{ rotate: "-18deg" }}>
        {sauceTop === "peanut" && <div className="peanut" />}
        {sauceTop === "jam" && <div className="jam" />}
      </div>
    </div>
  );
};

export default Bread;
