type ScoreBoardProps = {
  playerOneWins: number;
  playerTwoWins: number;
  draws: number;
  gamesPlayed: number;
};

export function ScoreBoard({
  playerOneWins,
  playerTwoWins,
  draws,
  gamesPlayed,
}: ScoreBoardProps) {
  return (
    <section
      className="rounded-lg border border-border bg-white p-4 shadow-sm"
      aria-labelledby="score-heading"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          id="score-heading"
          className="text-lg font-semibold tracking-normal"
        >
          Score
        </h2>
        <p className="text-sm text-muted-foreground">
          Games played: {gamesPlayed}
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-md bg-muted p-3">
          <dt className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
            Player 1
          </dt>
          <dd
            className="text-2xl font-bold tracking-normal"
            aria-label={`Player 1 score ${playerOneWins}`}
          >
            {playerOneWins}
          </dd>
        </div>
        <div className="rounded-md bg-muted p-3">
          <dt className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
            Player 2
          </dt>
          <dd
            className="text-2xl font-bold tracking-normal"
            aria-label={`Player 2 score ${playerTwoWins}`}
          >
            {playerTwoWins}
          </dd>
        </div>
        <div className="rounded-md bg-muted p-3">
          <dt className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
            Draws
          </dt>
          <dd
            className="text-2xl font-bold tracking-normal"
            aria-label={`Draw score ${draws}`}
          >
            {draws}
          </dd>
        </div>
      </dl>
    </section>
  );
}
