import { Moon, Sun } from "lucide-react";
import { useId } from "react";
import { THEME_OPTIONS, useThemeMode } from "../hooks/useThemeMode";
import { ThemePaletteSelector } from "./ThemePaletteSelector";

export function ThemeToggle() {
  const { themeId, themeMode, nextThemeMode, setThemeId, toggleThemeMode } =
    useThemeMode();
  const tooltipId = useId();
  const tooltipText =
    themeMode === "dark"
      ? "Click to enable light mode"
      : "Click to enable dark mode";

  return (
    <div className="flex shrink-0 items-start gap-2">
      <ThemePaletteSelector
        themes={THEME_OPTIONS}
        activeThemeId={themeId}
        onThemeChange={setThemeId}
      />
      <span className="group relative inline-flex">
        <button
          type="button"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-card-foreground shadow-xs transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary hover:cursor-pointer"
          aria-describedby={tooltipId}
          aria-label={`Switch to ${nextThemeMode} theme mode`}
          onClick={toggleThemeMode}
        >
          {themeMode === "light" ? (
            <Sun className="size-5" aria-hidden="true" />
          ) : (
            <Moon className="size-5" aria-hidden="true" />
          )}
        </button>
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute top-full right-0 z-10 mt-2 w-max max-w-52 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-card-foreground opacity-0 shadow-xs transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span
            className="-top-1.5 absolute right-3 size-3 rotate-45 border-t border-l border-border bg-card"
            aria-hidden="true"
          />
          {tooltipText}
        </span>
      </span>
    </div>
  );
}
