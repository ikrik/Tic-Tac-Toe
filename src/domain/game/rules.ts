import { BOARD_SIZE, MARKS, WINNING_LINES } from "./constants";
import type {
  ApplyMoveResult,
  Board,
  Cell,
  GameState,
  GameStatus,
  Mark,
  Move,
  MoveValidationResult,
  PlayerId,
  Winner,
} from "./types";

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () => null);
}

export function getAvailableCells(board: Board): number[] {
  if (!isValidBoard(board)) {
    return [];
  }

  return board.flatMap((cell, index) => (cell === null ? [index] : []));
}

export function validateMove(
  state: GameState,
  move: Move,
): MoveValidationResult {
  if (!isValidBoard(state.board)) {
    return { valid: false, reason: "invalid-board" };
  }

  if (!isValidCellIndex(move.cellIndex)) {
    return { valid: false, reason: "cell-out-of-range" };
  }

  if (!isValidMark(move.mark)) {
    return { valid: false, reason: "invalid-mark" };
  }

  if (
    !isValidPlayerId(move.playerId) ||
    state.players[move.playerId] === undefined
  ) {
    return { valid: false, reason: "invalid-player" };
  }

  if (move.playerId !== state.currentPlayerId) {
    return { valid: false, reason: "wrong-player" };
  }

  if (
    state.status !== "inProgress" ||
    getGameStatus(state.board) !== "inProgress"
  ) {
    return { valid: false, reason: "game-ended" };
  }

  if (state.board[move.cellIndex] !== null) {
    return { valid: false, reason: "cell-occupied" };
  }

  if (
    state.mode === "standard" &&
    move.mark !== state.players[move.playerId].mark
  ) {
    return { valid: false, reason: "wrong-mark" };
  }

  return { valid: true };
}

export function applyMove(state: GameState, move: Move): ApplyMoveResult {
  const validation = validateMove(state, move);

  if (!validation.valid) {
    return { ok: false, reason: validation.reason };
  }

  const board = state.board.map((cell, index) =>
    index === move.cellIndex ? move.mark : cell,
  );
  const winner = getWinner(board);

  return {
    ok: true,
    state: {
      ...state,
      board,
      currentPlayerId: getNextPlayer(state.currentPlayerId),
      status: getGameStatus(board),
      winner,
    },
  };
}

export function getWinner(board: Board): Winner | null {
  if (!isValidBoard(board)) {
    return null;
  }

  for (const line of WINNING_LINES) {
    const [firstIndex, secondIndex, thirdIndex] = line;
    const firstCell = board[firstIndex];

    if (
      firstCell !== null &&
      firstCell === board[secondIndex] &&
      firstCell === board[thirdIndex]
    ) {
      return { mark: firstCell, line };
    }
  }

  return null;
}

export function isDraw(board: Board): boolean {
  return (
    isValidBoard(board) &&
    getWinner(board) === null &&
    board.every((cell) => cell !== null)
  );
}

export function getNextPlayer(playerId: PlayerId): PlayerId {
  return playerId === "player1" ? "player2" : "player1";
}

export function getGameStatus(board: Board): GameStatus {
  if (getWinner(board) !== null) {
    return "win";
  }

  return isDraw(board) ? "draw" : "inProgress";
}

export function isValidBoard(board: Board): boolean {
  return (
    board.length === BOARD_SIZE &&
    board.every((cell): cell is Cell => cell === null || isValidMark(cell))
  );
}

export function isValidCellIndex(cellIndex: number): boolean {
  return (
    Number.isInteger(cellIndex) && cellIndex >= 0 && cellIndex < BOARD_SIZE
  );
}

function isValidMark(mark: unknown): mark is Mark {
  return MARKS.some((validMark) => validMark === mark);
}

function isValidPlayerId(playerId: unknown): playerId is PlayerId {
  return playerId === "player1" || playerId === "player2";
}
