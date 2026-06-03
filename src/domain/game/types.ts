export type Mark = "X" | "O";

export type Cell = Mark | null;

export type Board = Cell[];

export type GameMode = "standard" | "wild";

export type PlayerId = "player1" | "player2";

export type PlayerMode = "twoPlayers" | "vsComputer";

export type GameStatus = "inProgress" | "win" | "draw";

export type Player = {
  id: PlayerId;
  mark: Mark;
};

export type Players = Record<PlayerId, Player>;

export type Move = {
  cellIndex: number;
  mark: Mark;
  playerId: PlayerId;
};

export type GameState = {
  board: Board;
  mode: GameMode;
  playerMode: PlayerMode;
  players: Players;
  currentPlayerId: PlayerId;
  status: GameStatus;
  winner: Winner | null;
};

export type MoveValidationReason =
  | "invalid-board"
  | "cell-out-of-range"
  | "invalid-mark"
  | "invalid-player"
  | "game-ended"
  | "cell-occupied"
  | "wrong-mark"
  | "wrong-player";

export type MoveValidationResult =
  | { valid: true }
  | { valid: false; reason: MoveValidationReason };

export type Winner = {
  mark: Mark;
  line: readonly [number, number, number];
};

export type ApplyMoveResult =
  | {
      ok: true;
      state: GameState;
    }
  | {
      ok: false;
      reason: MoveValidationReason;
    };

export type AiOptions = {
  playerId: PlayerId;
};
