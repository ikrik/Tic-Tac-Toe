import { describe, expect, it } from "vitest";
import { chooseAiMove } from "./ai";
import { getGameStatus, getWinner } from "./rules";
import type { Board, GameMode, GameState } from "./types";

const createState = (board: Board, mode: GameMode = "standard"): GameState => ({
  board,
  mode,
  playerMode: "vsComputer",
  players: {
    player1: { id: "player1", mark: "X" },
    player2: { id: "player2", mark: "O" },
  },
  currentPlayerId: "player2",
  status: getGameStatus(board),
  winner: getWinner(board),
});

describe("AI heuristic", () => {
  it("takes a winning move", () => {
    const board: Board = ["X", "X", null, "O", null, null, null, "O", null];

    expect(chooseAiMove(createState(board), { playerId: "player1" })).toEqual({
      cellIndex: 2,
      mark: "X",
      playerId: "player1",
    });
  });

  it("blocks an immediate opponent win", () => {
    const board: Board = ["O", "O", null, "X", null, null, null, null, "X"];

    expect(chooseAiMove(createState(board), { playerId: "player1" })).toEqual({
      cellIndex: 2,
      mark: "X",
      playerId: "player1",
    });
  });

  it("takes the center before corners and edges", () => {
    const board: Board = ["O", null, null, null, null, null, null, null, null];

    expect(chooseAiMove(createState(board), { playerId: "player1" })).toEqual({
      cellIndex: 4,
      mark: "X",
      playerId: "player1",
    });
  });

  it("takes a corner before the first edge", () => {
    const board: Board = ["O", null, null, null, "X", null, null, null, null];

    expect(chooseAiMove(createState(board), { playerId: "player2" })).toEqual({
      cellIndex: 2,
      mark: "O",
      playerId: "player2",
    });
  });

  it("takes the first available cell after higher priorities are unavailable", () => {
    const board: Board = ["X", null, "O", "O", "X", "X", "X", "O", "O"];

    expect(chooseAiMove(createState(board), { playerId: "player1" })).toEqual({
      cellIndex: 1,
      mark: "X",
      playerId: "player1",
    });
  });

  it("evaluates both X and O for every available cell in Wild mode", () => {
    const board: Board = ["X", null, null, "O", "O", null, "X", null, null];

    expect(
      chooseAiMove(createState(board, "wild"), { playerId: "player1" }),
    ).toEqual({
      cellIndex: 5,
      mark: "O",
      playerId: "player1",
    });
  });
});
