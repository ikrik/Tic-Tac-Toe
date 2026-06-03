import { useEffect, useReducer } from "react";
import {
  createInitialGameViewState,
  gameReducer,
} from "../application/gameReducer";
import {
  selectCurrentMark,
  selectIsComputerTurn,
} from "../application/selectors";
import {
  loadGamePreferences,
  saveGamePreferences,
} from "../application/storage";
import {
  GameBoard,
  GameControls,
  GameStatus,
  MarkSelector,
  ScoreBoard,
  ThemeToggle,
} from "../ui/components";

const COMPUTER_MOVE_DELAY_MIN_MS = 500;
const COMPUTER_MOVE_DELAY_RANGE_MS = 1000;

export function App() {
  // state
  const [state, dispatch] = useReducer(gameReducer, undefined, () => {
    const preferences = loadGamePreferences();

    return createInitialGameViewState(preferences ?? undefined);
  });
  // selectors
  const currentPlayerMark = selectCurrentMark(state.game);
  const selectedMark =
    state.game.mode === "standard" ? currentPlayerMark : state.selectedWildMark;

  useEffect(() => {
    if (selectIsComputerTurn(state.game)) {
      const delay =
        COMPUTER_MOVE_DELAY_MIN_MS +
        Math.random() * COMPUTER_MOVE_DELAY_RANGE_MS;
      const timeoutId = window.setTimeout(() => {
        dispatch({ type: "playComputerMove" });
      }, delay);

      return () => window.clearTimeout(timeoutId);
    }
  }, [state.game]);

  useEffect(() => {
    saveGamePreferences({
      mode: state.game.mode,
      playerMode: state.game.playerMode,
      score: state.score,
      gamesPlayed: state.gamesPlayed,
    });
  }, [state.game.mode, state.game.playerMode, state.score, state.gamesPlayed]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:py-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Accessible game
          </p>
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            Tic Tac Toe
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="flex flex-col items-center gap-5">
          <GameStatus game={state.game} selectedMark={selectedMark} />
          <GameBoard
            board={state.game.board}
            winner={state.game.winner}
            isGameOver={state.game.status !== "inProgress"}
            onCellSelect={(cellIndex) => {
              dispatch({
                type: "playHumanMove",
                cellIndex,
                mark: selectedMark,
              });
            }}
          />
        </div>

        <aside className="flex flex-col gap-5">
          <ScoreBoard
            playerOneWins={state.score.player1}
            playerTwoWins={state.score.player2}
            draws={state.score.draws}
            gamesPlayed={state.gamesPlayed}
          />
          <MarkSelector
            mode={state.game.mode}
            selectedMark={selectedMark}
            currentPlayerMark={currentPlayerMark}
            onMarkChange={(mark) =>
              dispatch({ type: "setSelectedWildMark", mark })
            }
          />
          <GameControls
            mode={state.game.mode}
            playerMode={state.game.playerMode}
            onModeChange={(mode) => dispatch({ type: "setGameMode", mode })}
            onPlayerModeChange={(playerMode) =>
              dispatch({ type: "setPlayerMode", playerMode })
            }
            onNewGame={() => dispatch({ type: "startNewRound" })}
            onResetMatch={() => dispatch({ type: "resetMatch" })}
          />
        </aside>
      </div>
    </main>
  );
}
