import React from "react";

import "./Bread.sass";

interface Props {
  sauceTop?: "peanut" | "jam" | undefined;
  sauceBottom?: "peanut" | "jam" | undefined;
}

const Bread = ({ sauceTop, sauceBottom }: Props) => {
  return (
    <div className="Bread">
      {sauceBottom === "peanut" && <div className="peanut behind" />}
      {sauceBottom === "jam" && <div className="jam behind" />}
      <div className="slice" />
      {sauceTop === "peanut" && <div className="peanut" />}
      {sauceTop === "jam" && <div className="jam" />}
    </div>
  );
};

export default Bread;
