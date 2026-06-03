import type { Cell } from "../../domain/game/types";

type GameCellProps = {
  cellIndex: number;
  value: Cell;
  disabled: boolean;
  isWinningCell: boolean;
  onSelect: (cellIndex: number) => void;
};

export function GameCell({
  cellIndex,
  value,
  disabled,
  isWinningCell,
  onSelect,
}: GameCellProps) {
  const cellNumber = cellIndex + 1;
  const stateLabel = value === null ? "empty" : value;

  return (
    <button
      type="button"
      className={[
        "flex aspect-square min-h-20 items-center justify-center rounded-lg border-2 bg-white text-4xl font-bold tracking-normal shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary",
        disabled
          ? "cursor-not-allowed opacity-80"
          : "hover:border-primary hover:bg-accent",
        isWinningCell
          ? "border-primary bg-accent text-primary"
          : "border-border text-foreground",
      ].join(" ")}
      aria-label={`Cell ${cellNumber}, ${stateLabel}`}
      aria-pressed={value !== null}
      disabled={disabled}
      onClick={() => onSelect(cellIndex)}
    >
      <span aria-hidden="true">{value}</span>
    </button>
  );
}
