import type { Board, Winner } from "../../domain/game/types";
import { GameCell } from "./GameCell";

type GameBoardProps = {
  board: Board;
  winner: Winner | null;
  isGameOver: boolean;
  onCellSelect: (cellIndex: number) => void;
};

const CELL_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export function GameBoard({
  board,
  winner,
  isGameOver,
  onCellSelect,
}: GameBoardProps) {
  return (
    <section className="w-full max-w-sm" aria-labelledby="board-heading">
      <h2 id="board-heading" className="sr-only">
        Game board
      </h2>
      <fieldset className="grid grid-cols-3 gap-3 text-3xl">
        <legend className="sr-only">Tic Tac Toe board</legend>
        {CELL_INDICES.map((index) => (
          <GameCell
            key={`cell-${index}`}
            cellIndex={index}
            value={board[index]}
            disabled={isGameOver || board[index] !== null}
            isWinningCell={winner?.line.includes(index) ?? false}
            onSelect={onCellSelect}
          />
        ))}
      </fieldset>
    </section>
  );
}
