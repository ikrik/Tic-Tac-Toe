import { describe, expect, it } from "vitest";
import {
  applyMove,
  createEmptyBoard,
  getAvailableCells,
  getGameStatus,
  getNextPlayer,
  getWinner,
  isDraw,
  validateMove,
} from "./rules";
import type { Board, GameMode, GameState, Move } from "./types";

const createState = (
  board: Board = createEmptyBoard(),
  mode: GameMode = "standard",
): GameState => ({
  board,
  mode,
  playerMode: "twoPlayers",
  players: {
    player1: { id: "player1", mark: "X" },
    player2: { id: "player2", mark: "O" },
  },
  currentPlayerId: "player1",
  status: getGameStatus(board),
  winner: getWinner(board),
});

describe("game rules", () => {
  it("detects horizontal wins", () => {
    const board: Board = ["X", "X", "X", null, "O", null, "O", null, null];

    expect(getWinner(board)).toEqual({ mark: "X", line: [0, 1, 2] });
    expect(getGameStatus(board)).toBe("win");
  });

  it("detects vertical wins", () => {
    const board: Board = ["O", "X", null, "O", "X", null, "O", null, "X"];

    expect(getWinner(board)).toEqual({ mark: "O", line: [0, 3, 6] });
  });

  it("detects diagonal wins", () => {
    const board: Board = ["X", "O", null, null, "X", "O", null, null, "X"];

    expect(getWinner(board)).toEqual({ mark: "X", line: [0, 4, 8] });
  });

  it("detects draws", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

    expect(getWinner(board)).toBeNull();
    expect(isDraw(board)).toBe(true);
    expect(getGameStatus(board)).toBe("draw");
  });

  it("rejects occupied cells", () => {
    const board = createEmptyBoard();
    board[0] = "X";
    const state = createState(board, "wild");
    const move: Move = { cellIndex: 0, mark: "O", playerId: "player1" };

    expect(validateMove(state, move)).toEqual({
      valid: false,
      reason: "cell-occupied",
    });
    expect(applyMove(state, move)).toEqual({
      ok: false,
      reason: "cell-occupied",
    });
  });

  it("rejects invalid moves", () => {
    const state = createState();

    expect(
      validateMove(state, { cellIndex: -1, mark: "X", playerId: "player1" }),
    ).toEqual({
      valid: false,
      reason: "cell-out-of-range",
    });
    expect(
      validateMove(state, { cellIndex: 9, mark: "X", playerId: "player1" }),
    ).toEqual({
      valid: false,
      reason: "cell-out-of-range",
    });
  });

  it("rejects moves after the game has ended", () => {
    const board: Board = ["X", "X", "X", null, "O", null, "O", null, null];
    const state = createState(board);

    expect(
      validateMove(state, { cellIndex: 3, mark: "X", playerId: "player1" }),
    ).toEqual({
      valid: false,
      reason: "game-ended",
    });
  });

  it("enforces Standard mode marks from the current turn", () => {
    const state = createState();

    expect(
      validateMove(state, { cellIndex: 0, mark: "O", playerId: "player1" }),
    ).toEqual({
      valid: false,
      reason: "wrong-mark",
    });

    const applied = applyMove(state, {
      cellIndex: 0,
      mark: "X",
      playerId: "player1",
    });

    expect(applied).toEqual({
      ok: true,
      state: {
        ...state,
        board: ["X", null, null, null, null, null, null, null, null],
        currentPlayerId: "player2",
        status: "inProgress",
        winner: null,
      },
    });
    expect(state.board[0]).toBeNull();
  });

  it("allows Wild mode mark selection independent of current turn", () => {
    const state = createState(createEmptyBoard(), "wild");

    expect(
      validateMove(state, { cellIndex: 4, mark: "O", playerId: "player1" }),
    ).toEqual({
      valid: true,
    });
    expect(
      applyMove(state, { cellIndex: 4, mark: "O", playerId: "player1" }),
    ).toEqual({
      ok: true,
      state: {
        ...state,
        board: [null, null, null, null, "O", null, null, null, null],
        currentPlayerId: "player2",
        status: "inProgress",
        winner: null,
      },
    });
  });

  it("returns available cells and next player", () => {
    expect(
      getAvailableCells(["X", null, "O", null, null, null, null, null, null]),
    ).toEqual([1, 3, 4, 5, 6, 7, 8]);
    expect(getNextPlayer("player1")).toBe("player2");
    expect(getNextPlayer("player2")).toBe("player1");
  });
});
