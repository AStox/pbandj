import { forEach, random, reduce } from "lodash";
import React from "react";
import Bread from "./Bread";

interface JsonState {
  [id: string]: ("peanut" | "jam" | null)[][];
}

const BoardStateGenerator = (jsonState: JsonState) => {
  const output = reduce(
    jsonState,
    (output, place, key) => {
      const outputPlace = [];
      forEach(place, (slice) => {
        const top = slice[0];
        const bottom = slice[1];
        const bread = (
          <Bread
            sauceTop={top}
            sauceBottom={bottom}
            rotTop={random(20, 160)}
            rotBottom={random(20, 160)}
          />
        );
        outputPlace.push(bread);
      });
      output[key] = outputPlace;
      return output;
    },
    {}
  );
  return output;
};

export default BoardStateGenerator;
