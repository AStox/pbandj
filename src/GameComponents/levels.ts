import { ReactElement } from "react";

export type JsonLevel = {
  [id: string]: ("peanut" | "jam" | null)[][];
};

export type Level = {
  [id: string]: ReactElement[];
};

export const levels: { [mode: string]: JsonLevel[] } = {
  main: [
    {
      "00": [["peanut", null]],
      "10": [["jam", null]],
    },
    {
      "00": [
        ["peanut", null],
        [null, null],
      ],
      "10": [
        ["jam", null],
        [null, null],
      ],
    },
    {
      "00": [
        [null, null],
        ["peanut", null],
        [null, null],
        ["jam", null],
      ],
      "10": [],
    },
  ],
  custom: [],
};
