import { getAvailableCells, getWinner, isDraw } from "../domain/game/rules";
import type { GameState, Mark, PlayerId } from "../domain/game/types";

export function selectWinner(state: GameState) {
  return getWinner(state.board);
}

export function selectAvailableCells(state: GameState): number[] {
  return getAvailableCells(state.board);
}

export function selectIsDraw(state: GameState): boolean {
  return isDraw(state.board);
}

export function selectCurrentMark(state: GameState): Mark {
  return state.players[state.currentPlayerId].mark;
}

export function selectIsComputerTurn(state: GameState): boolean {
  return (
    state.playerMode === "vsComputer" &&
    state.currentPlayerId === "player2" &&
    state.status === "inProgress"
  );
}

export function selectPlayerLabel(playerId: PlayerId): string {
  return playerId === "player1" ? "Player 1" : "Player 2";
}
