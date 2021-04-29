import React from "react";
// import { render } from "@testing-library/react";

import BoardStateGenerator from "./BoardStateGenerator";
import Bread from "./Bread";

const jsonData = {
  "00": [[null, null]],
};

let output = {
  "00": [<Bread sauceTop={null} sauceBottom={null} />],
};

test("generates a blank slice", () => {
  expect(BoardStateGenerator(jsonData)).toMatchObject(output);
});

const level1 = {
  "00": [["peanut", null]],
  "10": [["jam", null]],
};

output = {
  "00": [<Bread sauceTop={"peanut"} sauceBottom={null} />],
  "10": [<Bread sauceTop={"jam"} sauceBottom={null} />],
};

test("generates the first level", () => {
  expect(BoardStateGenerator(level1)).toMatchObject(output);
});
