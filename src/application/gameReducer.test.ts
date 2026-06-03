import { describe, expect, it } from "vitest";
import { createInitialGameViewState, gameReducer } from "./gameReducer";

describe("gameReducer", () => {
  it("applies valid human moves through the domain rules", () => {
    const state = createInitialGameViewState();
    const nextState = gameReducer(state, {
      type: "playHumanMove",
      cellIndex: 0,
    });

    expect(nextState.game.board[0]).toBe("X");
    expect(nextState.game.currentPlayerId).toBe("player2");
    expect(state.game.board[0]).toBeNull();
  });

  it("prevents invalid occupied-cell transitions", () => {
    const state = createInitialGameViewState();
    const afterFirstMove = gameReducer(state, {
      type: "playHumanMove",
      cellIndex: 0,
    });
    const afterInvalidMove = gameReducer(afterFirstMove, {
      type: "playHumanMove",
      cellIndex: 0,
    });

    expect(afterInvalidMove).toBe(afterFirstMove);
  });

  it("enforces standard mode marks", () => {
    const state = createInitialGameViewState();
    const nextState = gameReducer(state, {
      type: "playHumanMove",
      cellIndex: 0,
      mark: "O",
    });

    expect(nextState.game.board[0]).toBe("X");
  });

  it("allows wild mode selected marks", () => {
    const state = gameReducer(createInitialGameViewState(), {
      type: "setGameMode",
      mode: "wild",
    });
    const nextState = gameReducer(state, {
      type: "playHumanMove",
      cellIndex: 4,
      mark: "O",
    });

    expect(nextState.game.board[4]).toBe("O");
    expect(nextState.game.currentPlayerId).toBe("player2");
  });

  it("updates score when a player wins", () => {
    let state = createInitialGameViewState();
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 0 });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 3 });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 1 });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 4 });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 2 });

    expect(state.game.status).toBe("win");
    expect(state.score.player1).toBe(1);
    expect(state.gamesPlayed).toBe(1);
  });

  it("prevents out-of-order human moves during computer turn", () => {
    let state = createInitialGameViewState({ playerMode: "vsComputer" });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 0 });
    const unchanged = gameReducer(state, {
      type: "playHumanMove",
      cellIndex: 1,
    });

    expect(unchanged).toBe(state);
  });

  it("applies a computer move when it is the computer turn", () => {
    let state = createInitialGameViewState({ playerMode: "vsComputer" });
    state = gameReducer(state, { type: "playHumanMove", cellIndex: 0 });
    const nextState = gameReducer(state, { type: "playComputerMove" });

    expect(nextState.game.board.filter(Boolean)).toHaveLength(2);
    expect(nextState.game.currentPlayerId).toBe("player1");
  });
});
