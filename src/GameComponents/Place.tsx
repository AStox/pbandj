import React, { Component } from "react";
import { ReactElement } from "react";

import "./Place.sass";

interface Props {
  bread?: ReactElement;
}

const Place = ({ bread }: Props) => {
  return <div className="Place">{bread}</div>;
};

export default Place;
