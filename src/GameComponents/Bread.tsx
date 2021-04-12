import React from "react";

import "./Bread.sass";

interface Props {
  sauce?: "peanut" | "jam" | undefined;
}

const Bread = ({ sauce }: Props) => {
  return (
    <div className="Bread">
      {sauce === "peanut" && <div className="peanut" />}
      {sauce === "jam" && <div className="jam" />}
    </div>
  );
};

export default Bread;
