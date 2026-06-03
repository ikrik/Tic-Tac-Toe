import type { GameMode, PlayerMode } from "../domain/game/types";
import type { Score } from "./gameReducer";

const STORAGE_KEY = "tic-tac-toe:preferences";

export type PersistedGamePreferences = {
  mode: GameMode;
  playerMode: PlayerMode;
  score: Score;
  gamesPlayed: number;
};

export function loadGamePreferences(): PersistedGamePreferences | null {
  if (typeof sessionStorage === "undefined") {
    return null;
  }

  let storedValue: string | null;

  try {
    storedValue = sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (storedValue === null) {
    return null;
  }

  try {
    return parsePreferences(JSON.parse(storedValue));
  } catch {
    return null;
  }
}

export function saveGamePreferences(
  preferences: PersistedGamePreferences,
): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    return;
  }
}

function parsePreferences(value: unknown): PersistedGamePreferences | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const preferences = value as Partial<PersistedGamePreferences>;

  if (
    !isGameMode(preferences.mode) ||
    !isPlayerMode(preferences.playerMode) ||
    !isScore(preferences.score) ||
    typeof preferences.gamesPlayed !== "number"
  ) {
    return null;
  }

  return {
    mode: preferences.mode,
    playerMode: preferences.playerMode,
    score: preferences.score,
    gamesPlayed: preferences.gamesPlayed,
  };
}

function isGameMode(value: unknown): value is GameMode {
  return value === "standard" || value === "wild";
}

function isPlayerMode(value: unknown): value is PlayerMode {
  return value === "twoPlayers" || value === "vsComputer";
}

function isScore(value: unknown): value is Score {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const score = value as Partial<Score>;

  return (
    typeof score.player1 === "number" &&
    typeof score.player2 === "number" &&
    typeof score.draws === "number"
  );
}
