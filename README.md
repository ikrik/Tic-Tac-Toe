# Tic Tac Toe

A client-side Tic Tac Toe app built with React 19, TypeScript, Vite, Tailwind CSS, Radix UI primitives, Biome, Vitest, and React Testing Library.

## Technical Design

This assignment describes a client-side Tic Tac Toe app built with React and TypeScript, with emphasis on rule correctness, clear separation between domain and UI concerns, accessibility, and testability. It highlights the two game modes, the lightweight heuristic computer player, and a deliberately small implementation without backend services or advanced AI.

[Technical Design Assignment](src/docs/Technical%20Design%20Assignment.pdf)

- Live demo: https://tic-tac-toe-ikrik.vercel.app

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

## Test And Check

```bash
pnpm biome check .
pnpm test
pnpm typecheck
```

## Architecture

The code uses a small clean-architecture-inspired structure:

- `src/domain/game`: pure TypeScript game rules, move validation, winner/draw detection, and AI move selection.
- `src/application`: reducer orchestration, UI selectors, and optional session preference storage.
- `src/ui/components`: accessible rendering components for the board, controls, status, score, and mark selection.
- `src/app`: React entry point and app composition.

Dependency direction is kept one way: UI uses application/domain types, application uses domain rules, and domain imports no React, browser APIs, storage, or UI code.

## Game Modes

Standard mode fixes Player 1 to `X` and Player 2/computer to `O`.

Wild mode lets the current player choose `X` or `O` on each move. The first player to create three consecutive matching marks wins.

## Computer Player

The computer uses a simple deterministic heuristic:

1. Take an immediate winning move.
2. Block the opponent's immediate winning cell.
3. Take the center.
4. Take the first available corner.
5. Take the first available cell.

Wild mode evaluates both `X` and `O` for every available cell. The AI reuses the same domain validation and move application rules as human moves.

## Persistence

The active board is kept in memory. Session storage is used only for non-critical match preferences: game mode, player mode, score, and games played.

## Trade-Offs

This project intentionally omits backend services, routing, authentication, online multiplayer, advanced AI, minimax, and Playwright E2E coverage. The focus is rule correctness, accessibility, and testability for a small 3x3 game.
