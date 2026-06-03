import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

beforeEach(() => {
  sessionStorage.clear();
});

describe("App", () => {
  it("starts a game and can reset the board", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Tic Tac Toe" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Turn: Player 1 (X)")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Cell \d, empty/ }),
    ).toHaveLength(9);

    await user.click(screen.getByRole("button", { name: "Cell 1, empty" }));
    expect(screen.getByRole("button", { name: "Cell 1, X" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "New game" }));
    expect(
      screen.getAllByRole("button", { name: /Cell \d, empty/ }),
    ).toHaveLength(9);
    expect(screen.getByText("Turn: Player 1 (X)")).toBeInTheDocument();
  });

  it("lets players make standard moves in turn", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Cell 1, empty" }));
    await user.click(screen.getByRole("button", { name: "Cell 2, empty" }));

    expect(screen.getByRole("button", { name: "Cell 1, X" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cell 2, O" })).toBeDisabled();
    expect(screen.getByText("Turn: Player 1 (X)")).toBeInTheDocument();
  });

  it("switches to Wild mode and applies the selected mark", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("radio", { name: "Wild" }));
    await user.click(screen.getByRole("radio", { name: "Select O" }));
    await user.click(screen.getByRole("button", { name: "Cell 1, empty" }));

    expect(screen.getByText("Selected mode: Wild")).toBeInTheDocument();
    expect(screen.getAllByText("Selected mark: O")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Cell 1, O" })).toBeDisabled();
  });

  it("switches to Human vs computer and plays the computer response", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("radio", { name: "Human vs computer" }));
    await user.click(screen.getByRole("button", { name: "Cell 1, empty" }));

    expect(
      screen.getByText("Selected players: Human vs computer"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cell 1, X" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cell 5, O" })).toBeDisabled();
    expect(screen.getByText("Turn: Player 1 (X)")).toBeInTheDocument();
  });

  it("updates score after a player wins", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Cell 1, empty" }));
    await user.click(screen.getByRole("button", { name: "Cell 4, empty" }));
    await user.click(screen.getByRole("button", { name: "Cell 2, empty" }));
    await user.click(screen.getByRole("button", { name: "Cell 5, empty" }));
    await user.click(screen.getByRole("button", { name: "Cell 3, empty" }));

    expect(screen.getByText("Winner: X")).toBeInTheDocument();
    expect(screen.getByLabelText("Player 1 score 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Player 2 score 0")).toBeInTheDocument();
    expect(screen.getByLabelText("Draw score 0")).toBeInTheDocument();
  });

  it("exposes core accessible controls and disabled cell behavior", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const board = screen.getByRole("group", { name: "Tic Tac Toe board" });
    expect(within(board).getAllByRole("button")).toHaveLength(9);
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
      "Turn: Player 1 (X)",
    );

    const firstCell = screen.getByRole("button", { name: "Cell 1, empty" });
    firstCell.focus();
    expect(firstCell).toHaveFocus();

    await user.click(firstCell);
    expect(screen.getByRole("button", { name: "Cell 1, X" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Standard" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Select O" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
