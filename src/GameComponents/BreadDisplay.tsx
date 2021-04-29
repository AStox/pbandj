import React from "react";
import Bread from "./Bread";

const BreadDisplay = () => {
  return (
    <div className="BreadDisplay">
      <div className="bread-container">
        <div className="slice-container">
          <Bread />
        </div>
      </div>
    </div>
  );
};

export default BreadDisplay;
