import * as RadioGroup from "@radix-ui/react-radio-group";
import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import type { GameMode, PlayerMode } from "../../domain/game/types";

type GameControlsProps = {
  mode: GameMode;
  playerMode: PlayerMode;
  onModeChange: (mode: GameMode) => void;
  onPlayerModeChange: (playerMode: PlayerMode) => void;
  onNewGame: () => void;
  onResetMatch: () => void;
};

const choiceClassName =
  "rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground";

export function GameControls({
  mode,
  playerMode,
  onModeChange,
  onPlayerModeChange,
  onNewGame,
  onResetMatch,
}: GameControlsProps) {
  return (
    <section
      className="flex w-full flex-col gap-5"
      aria-labelledby="controls-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="controls-heading"
          className="text-lg font-semibold tracking-normal"
        >
          Controls
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onNewGame}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          New game
        </button>
      </div>
      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={onResetMatch}
      >
        Reset match
      </button>

      <RadioFieldset legend="Game mode">
        <RadioGroup.Root
          className="flex flex-wrap gap-2"
          value={mode}
          onValueChange={(value) => onModeChange(value as GameMode)}
          aria-label="Game mode"
        >
          <RadioGroup.Item
            className={choiceClassName}
            value="standard"
            id="mode-standard"
          >
            Standard
          </RadioGroup.Item>
          <RadioGroup.Item
            className={choiceClassName}
            value="wild"
            id="mode-wild"
          >
            Wild
          </RadioGroup.Item>
        </RadioGroup.Root>
        <p className="text-sm text-muted-foreground">
          Selected mode: {mode === "standard" ? "Standard" : "Wild"}
        </p>
      </RadioFieldset>

      <RadioFieldset legend="Players">
        <RadioGroup.Root
          className="flex flex-wrap gap-2"
          value={playerMode}
          onValueChange={(value) => onPlayerModeChange(value as PlayerMode)}
          aria-label="Players"
        >
          <RadioGroup.Item
            className={choiceClassName}
            value="twoPlayers"
            id="players-two"
          >
            Two players
          </RadioGroup.Item>
          <RadioGroup.Item
            className={choiceClassName}
            value="vsComputer"
            id="players-computer"
          >
            Human vs computer
          </RadioGroup.Item>
        </RadioGroup.Root>
        <p className="text-sm text-muted-foreground">
          Selected players:{" "}
          {playerMode === "twoPlayers" ? "Two players" : "Human vs computer"}
        </p>
      </RadioFieldset>
    </section>
  );
}

function RadioFieldset({
  legend,
  children,
}: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold tracking-normal">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
