import { random } from "lodash";
import React, { ReactElement } from "react";

import "./Bread.sass";

interface Props {
  sauceTop?: "peanut" | "jam" | undefined;
  sauceBottom?: "peanut" | "jam" | undefined;
  selected?: ReactElement | null;
  setSelected(element: ReactElement | null): void;
  addSlice(): void;
}

const Bread = (props: Props) => {
  const { sauceTop, sauceBottom, selected, setSelected, addSlice } = props;

  //   const addSlice = () => {
  //     if (selected) {
  //       updateBoard(id, [selected]);
  //       setSelected(null);
  //     }
  //   };

  const handleClick = () => {
    if (selected) {
      addSlice();
    } else {
      setSelected(<Bread {...props} />);
    }
  };

  return (
    <div className="Bread" onClick={handleClick}>
      {sauceBottom === "peanut" && <div className="peanut behind" />}
      {sauceBottom === "jam" && <div className="jam behind" />}
      <div className="slice" style={{ rotate: `${random(-2, 2)}deg` }} />
      {sauceTop === "peanut" && <div className="peanut" />}
      {sauceTop === "jam" && <div className="jam" />}
    </div>
  );
};

export default Bread;
