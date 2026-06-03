import type { Mark } from "./types";

export const BOARD_SIZE = 9;

export const CENTER_CELL_INDEX = 4;

export const CORNER_CELL_INDICES = [0, 2, 6, 8] as const;

export const MARKS = ["X", "O"] as const satisfies readonly Mark[];

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;
