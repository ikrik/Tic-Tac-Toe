import type { GameState, Mark, PlayerId } from "../../domain/game/types";

type GameStatusProps = {
  game: GameState;
  selectedMark: Mark;
};

export function GameStatus({ game, selectedMark }: GameStatusProps) {
  const statusText = getStatusText(game);

  return (
    <section
      className="flex min-h-28 flex-col justify-center gap-2 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs"
      aria-labelledby="status-heading"
    >
      <h2 id="status-heading" className="text-lg font-semibold tracking-normal">
        Game status
      </h2>
      <p className="text-xl font-semibold tracking-normal" aria-live="polite">
        {statusText}
      </p>
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <p>Current player: {formatPlayer(game, game.currentPlayerId)}</p>
        <p>Selected mark: {selectedMark}</p>
      </div>
    </section>
  );
}

function getStatusText(game: GameState): string {
  if (game.status === "win" && game.winner !== null) {
    return `Winner: ${game.winner.mark}`;
  }

  if (game.status === "draw") {
    return "Draw game";
  }

  return `Turn: ${formatPlayer(game, game.currentPlayerId)}`;
}

function formatPlayer(game: GameState, playerId: PlayerId): string {
  const playerNumber = playerId === "player1" ? "Player 1" : "Player 2";
  const suffix =
    game.playerMode === "vsComputer" && playerId === "player2"
      ? "computer"
      : game.players[playerId].mark;

  return `${playerNumber} (${suffix})`;
}
