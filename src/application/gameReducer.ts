import { chooseAiMove } from "../domain/game/ai";
import {
  applyMove,
  createEmptyBoard,
  getGameStatus,
  getWinner,
} from "../domain/game/rules";
import type {
  GameMode,
  GameState,
  Mark,
  Move,
  PlayerId,
  PlayerMode,
  Players,
} from "../domain/game/types";
import { selectIsComputerTurn } from "./selectors";

export type Score = {
  player1: number;
  player2: number;
  draws: number;
};

export type GameViewState = {
  game: GameState;
  selectedWildMark: Mark;
  score: Score;
  gamesPlayed: number;
};

export type GameAction =
  | { type: "playHumanMove"; cellIndex: number; mark?: Mark }
  | { type: "playComputerMove" }
  | { type: "setGameMode"; mode: GameMode }
  | { type: "setPlayerMode"; playerMode: PlayerMode }
  | { type: "setSelectedWildMark"; mark: Mark }
  | { type: "startNewRound" }
  | { type: "resetMatch" };

const PLAYERS: Players = {
  player1: { id: "player1", mark: "X" },
  player2: { id: "player2", mark: "O" },
};

const EMPTY_SCORE: Score = {
  player1: 0,
  player2: 0,
  draws: 0,
};

type InitialGameOptions = {
  mode?: GameMode;
  playerMode?: PlayerMode;
  score?: Score;
  gamesPlayed?: number;
};

export function createInitialGameViewState(
  options: InitialGameOptions = {},
): GameViewState {
  const mode = options.mode ?? "standard";
  const playerMode = options.playerMode ?? "twoPlayers";

  return {
    game: createGameState(mode, playerMode),
    selectedWildMark: "X",
    score: options.score ?? EMPTY_SCORE,
    gamesPlayed: options.gamesPlayed ?? 0,
  };
}

export function gameReducer(
  state: GameViewState,
  action: GameAction,
): GameViewState {
  switch (action.type) {
    case "playHumanMove": {
      if (selectIsComputerTurn(state.game)) {
        return state;
      }

      const mark =
        state.game.mode === "standard"
          ? state.game.players[state.game.currentPlayerId].mark
          : action.mark;

      if (mark === undefined) {
        return state;
      }

      return applyMoveAndScore(state, {
        cellIndex: action.cellIndex,
        mark,
        playerId: state.game.currentPlayerId,
      });
    }
    case "playComputerMove": {
      if (!selectIsComputerTurn(state.game)) {
        return state;
      }

      const move = chooseAiMove(state.game, { playerId: "player2" });

      return move === null ? state : applyMoveAndScore(state, move);
    }
    case "setGameMode":
      if (action.mode === state.game.mode) {
        return state;
      }

      return {
        ...state,
        game: createGameState(action.mode, state.game.playerMode),
        selectedWildMark: "X",
      };
    case "setPlayerMode":
      if (action.playerMode === state.game.playerMode) {
        return state;
      }

      return {
        ...state,
        game: createGameState(state.game.mode, action.playerMode),
        selectedWildMark: "X",
      };
    case "setSelectedWildMark":
      return {
        ...state,
        selectedWildMark: action.mark,
      };
    case "startNewRound":
      return {
        ...state,
        game: createGameState(state.game.mode, state.game.playerMode),
        selectedWildMark: "X",
      };
    case "resetMatch":
      return createInitialGameViewState({
        mode: state.game.mode,
        playerMode: state.game.playerMode,
      });
  }
}

function createGameState(mode: GameMode, playerMode: PlayerMode): GameState {
  const board = createEmptyBoard();

  return {
    board,
    mode,
    playerMode,
    players: PLAYERS,
    currentPlayerId: "player1",
    status: getGameStatus(board),
    winner: getWinner(board),
  };
}

function applyMoveAndScore(state: GameViewState, move: Move): GameViewState {
  const result = applyMove(state.game, move);

  if (!result.ok) {
    return state;
  }

  const nextState = {
    ...state,
    game: result.state,
  };

  return result.state.status === "inProgress"
    ? nextState
    : finalizeRound(nextState, move.playerId);
}

function finalizeRound(
  state: GameViewState,
  lastPlayerId: PlayerId,
): GameViewState {
  const score = { ...state.score };

  if (state.game.status === "draw") {
    score.draws += 1;
  } else if (state.game.status === "win") {
    score[lastPlayerId] += 1;
  }

  return {
    ...state,
    score,
    gamesPlayed: state.gamesPlayed + 1,
  };
}
