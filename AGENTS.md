# AGENTS.md

## Project Overview

This repository contains a client-side Tic Tac Toe application built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Biome
- Vitest
- React Testing Library

The project intentionally prioritizes:

1. Correctness of game rules
2. Simplicity
3. Accessibility
4. Testability
5. Clear separation of concerns

This is a small, time-constrained frontend application. Avoid overengineering.

---

# Core Engineering Principles

## Prioritize Correctness Over Features

The most important part of the application is the correctness of:

- Standard Tic Tac Toe rules
- Wild Tic Tac Toe rules
- AI(computer) move behavior
- State transitions

If implementation time becomes constrained:

1. Keep domain correctness
2. Keep tests
3. Keep accessibility
4. Remove optional features first

Optional features include:

- Persistence
- Extra animations
- Fancy UI polish
- Advanced AI

---

# Architecture Rules

The project follows a lightweight clean-architecture-inspired structure.

## Dependency Direction

Allowed dependency flow:

UI → Application → Domain  
 ↓  
 Infrastructure

Never reverse this dependency direction.

---

# Domain Layer Rules (Highest Priority)

The domain layer is the heart of the application.

## Domain layer MUST:

- Be pure TypeScript
- Be framework agnostic
- Be deterministic
- Be highly testable
- Contain all game rules

## Domain layer MUST NOT:

- Import React
- Import browser APIs
- Import sessionStorage/localStorage
- Import UI components
- Import Tailwind
- Import shadcn/ui
- Import Radix
- Perform side effects
- Depend on async behavior

## Domain Responsibilities

The domain layer is responsible for:

- Move validation
- Applying moves
- Winner detection
- Draw detection
- Standard mode rules
- Wild mode rules
- AI(computer) move evaluation
- Preventing invalid transitions

All game invariants must be enforced here.

---

# Application Layer Rules

The application layer coordinates behavior.

## Responsibilities

- Reducer/state orchestration
- Triggering AI turns
- Deriving UI-friendly state
- Persistence coordination
- Connecting UI with domain logic

## State Management

Use:

- React useReducer

Do NOT use:

- Redux
- Zustand
- Context-heavy architectures

The reducer should:

- coordinate transitions
- prevent invalid flows
- remain predictable
- avoid duplicated derived state

## Derived State

Avoid storing derived values when they can be computed.

Examples:

- winner
- available moves
- draw state

Prefer selectors/helper functions.

---

# UI Layer Rules

## UI Components

UI components should remain:

- Small
- Declarative
- Accessible
- Focused on rendering and interaction

Avoid embedding business logic in components.

Use componsition patterns

---

# Styling Rules

Use:

- Tailwind CSS
- CSS Grid for board layout
- Flexbox for surrounding layouts

Do NOT:

- create complex design systems
- over-engineer styling abstractions
- introduce unnecessary animation systems

Keep the UI clean and simple.

---

# shadcn/ui + Radix Rules

Use shadcn/ui and Radix UI primarily for:

- Accessible controls
- Keyboard navigation
- Form/select primitives
- Dialogs/buttons if needed

Do NOT:

- Wrap every element unnecessarily
- Overabstract primitives
- Introduce heavy UI composition patterns

Accessibility matters more than visual polish.

---

# Accessibility Requirements

Accessibility is a core requirement.

The application MUST support:

- Keyboard navigation
- Visible focus states
- Semantic buttons
- aria-live announcements
- Proper disabled states
- Screen-reader-friendly labels

Do NOT rely only on color.

Board cells must use semantic interactive elements.

---

# AI(computer) Rules

The AI(computer) is intentionally heuristic-based.

Do NOT implement:

- full minimax
- Monte Carlo
- advanced search trees
- unnecessary optimization

The AI should:

1. Play winning move
2. Block opponent winning move
3. Take center
4. Take corner
5. Take first available cell

Wild mode must evaluate:

- both X and O
- for every available cell

AI must reuse domain rules and validation.

---

# Persistence Rules

Persistence is optional/nice-to-have.

If implemented:

- use sessionStorage only
- persist non-critical state only

Examples:

- game mode
- player mode
- score
- games played

Do NOT:

- overcomplicate hydration
- persist complex domain internals
- weaken correctness for persistence

If persistence introduces complexity:
remove persistence first.

---

# Testing Philosophy

Testing is extremely important.

Priority order:

1. Domain unit tests
2. AI tests
3. Reducer tests
4. Integration tests
5. E2E tests (optional)

---

# Required Domain Test Coverage

Test:

- horizontal wins
- vertical wins
- diagonal wins
- draw detection
- occupied cell rejection
- invalid move rejection
- post-game move prevention
- Standard mode enforcement
- Wild mode mark selection
- AI winning moves
- AI blocking moves
- Wild mode AI evaluation

The domain layer should have the highest test confidence.

---

# Integration Testing Rules

Use:

- React Testing Library
- Vitest

Test:

- starting game
- making moves
- switching modes
- human vs AI flow
- score updates
- accessibility basics

Avoid brittle implementation-detail tests.

---

# E2E Testing

E2E is will not be implemented.

Only implement Playwright if I intentionally been asked to create:

- all core functionality is complete
- tests already exist
- time permits

Never sacrifice domain correctness for E2E coverage.

---

# TypeScript Rules

Use strict TypeScript.

## Requirements

- "strict": true
- avoid any
- prefer explicit types
- prefer discriminated unions where useful
- keep types readable

Do NOT:

- over-genericize
- create unnecessary abstractions
- introduce type complexity without value

Clarity is preferred over cleverness.

---

# Code Quality Rules

Use:

- Biome for formatting and linting

Before finalizing any work ALWAYS run:

bash pnpm biome check . pnpm test pnpm typecheck

Never leave:

- failing tests
- lint violations
- broken type checks

---

# Preferred Engineering Style

Prefer:

- simple code
- explicit naming
- pure functions
- composition over abstraction
- readability over cleverness

Avoid:

- premature optimization
- deep inheritance
- unnecessary indirection
- speculative architecture

This repository intentionally values maintainability and predictability over sophistication.

---

# Performance Expectations

Performance is not a concern for this application.

The board is fixed (3x3), therefore:

- simple algorithms are preferred
- readability is preferred over micro-optimizations

Do NOT add optimization complexity unless clearly necessary.

---

# Non-Goals

The following are intentionally out of scope:

- Backend/server
- Authentication
- Online multiplayer
- Firebase/Supabase
- WebSockets
- Microfrontends
- Monorepo tooling
- Complex routing
- URL-based game persistence
- Advanced AI engines
- Animation-heavy UX

Do not introduce these.

---

# Final Deliverable Expectations

The final result should include:

- Working application
- Clean architecture
- Passing tests
- Accessible UI
- Simple UX
- Clear folder structure
- README documentation

The codebase should feel:

- intentional
- lightweight
- predictable
- production-aware
- easy to reason about
