import { CENTER_CELL_INDEX, CORNER_CELL_INDICES, MARKS } from "./constants";
import {
  applyMove,
  getAvailableCells,
  getGameStatus,
  getNextPlayer,
} from "./rules";
import type { AiOptions, GameState, Mark, Move, PlayerId } from "./types";

export function chooseAiMove(
  state: GameState,
  options: AiOptions,
): Move | null {
  if (
    state.status !== "inProgress" ||
    getGameStatus(state.board) !== "inProgress"
  ) {
    return null;
  }

  return (
    findWinningMove(state, options.playerId) ??
    findBlockingMove(state, options.playerId) ??
    findCenterMove(state, options.playerId) ??
    findCornerMove(state, options.playerId) ??
    findFirstAvailableMove(state, options.playerId)
  );
}

function findWinningMove(state: GameState, playerId: PlayerId): Move | null {
  return findMoveByOutcome({ ...state, currentPlayerId: playerId }, playerId);
}

function findBlockingMove(state: GameState, playerId: PlayerId): Move | null {
  const opponentId = getNextPlayer(playerId);
  const opponentWinningMove = findMoveByOutcome(
    { ...state, currentPlayerId: opponentId },
    opponentId,
  );

  if (opponentWinningMove === null) {
    return null;
  }

  return {
    cellIndex: opponentWinningMove.cellIndex,
    mark:
      state.mode === "standard"
        ? state.players[playerId].mark
        : opponentWinningMove.mark,
    playerId,
  };
}

function findCenterMove(state: GameState, playerId: PlayerId): Move | null {
  if (state.board[CENTER_CELL_INDEX] !== null) {
    return null;
  }

  return createFallbackMove(CENTER_CELL_INDEX, state, playerId);
}

function findCornerMove(state: GameState, playerId: PlayerId): Move | null {
  const cornerCellIndex = CORNER_CELL_INDICES.find(
    (cellIndex) => state.board[cellIndex] === null,
  );

  return cornerCellIndex === undefined
    ? null
    : createFallbackMove(cornerCellIndex, state, playerId);
}

function findFirstAvailableMove(
  state: GameState,
  playerId: PlayerId,
): Move | null {
  const cellIndex = getAvailableCells(state.board)[0];

  return cellIndex === undefined
    ? null
    : createFallbackMove(cellIndex, state, playerId);
}

function findMoveByOutcome(state: GameState, playerId: PlayerId): Move | null {
  for (const cellIndex of getAvailableCells(state.board)) {
    for (const mark of getCandidateMarks(state, playerId)) {
      const move: Move = { cellIndex, mark, playerId };
      const result = applyMove(state, move);

      if (result.ok && result.state.status === "win") {
        return move;
      }
    }
  }

  return null;
}

function createFallbackMove(
  cellIndex: number,
  state: GameState,
  playerId: PlayerId,
): Move {
  return {
    cellIndex,
    mark: state.players[playerId].mark,
    playerId,
  };
}

function getCandidateMarks(
  state: GameState,
  playerId: PlayerId,
): readonly Mark[] {
  return state.mode === "standard" ? [state.players[playerId].mark] : MARKS;
}
