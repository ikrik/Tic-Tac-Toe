import * as RadioGroup from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import type { GameMode, Mark } from "../../domain/game/types";
import { cn } from "../../lib/utils";

type MarkSelectorProps = {
  mode: GameMode;
  selectedMark: Mark;
  currentPlayerMark: Mark;
  onMarkChange: (mark: Mark) => void;
};

const markClassName = cva(
  "flex size-14 items-center justify-center rounded-md border-2 border-border bg-card text-2xl font-bold tracking-normal text-card-foreground focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-primary hover:cursor-pointer",
);

export function MarkSelector({
  mode,
  selectedMark,
  currentPlayerMark,
  onMarkChange,
}: MarkSelectorProps) {
  return (
    <section className="flex flex-col gap-3" aria-labelledby="mark-heading">
      <div>
        <h2 id="mark-heading" className="text-lg font-semibold tracking-normal">
          Mark
        </h2>
        <p className="text-sm text-muted-foreground">
          {mode === "wild"
            ? "Selected mark controls the next move."
            : `Standard mode uses ${currentPlayerMark}.`}
        </p>
      </div>
      <RadioGroup.Root
        className="flex gap-3"
        value={selectedMark}
        onValueChange={(value) => onMarkChange(value as Mark)}
        aria-label="Mark selection"
        disabled={mode === "standard"}
      >
        <RadioGroup.Item
          className={cn(markClassName())}
          value="X"
          aria-label="Select X"
        >
          X
        </RadioGroup.Item>
        <RadioGroup.Item
          className={cn(markClassName())}
          value="O"
          aria-label="Select O"
        >
          O
        </RadioGroup.Item>
      </RadioGroup.Root>
      <p className="text-sm font-medium">Selected mark: {selectedMark}</p>
    </section>
  );
}
