import { useId } from "react";
import { cn } from "../../lib/utils";
import type { ThemeId, ThemeOption } from "../hooks/useThemeMode";

type ThemePaletteSelectorProps = {
  themes: ThemeOption[];
  activeThemeId: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
};

export function ThemePaletteSelector({
  themes,
  activeThemeId,
  onThemeChange,
}: ThemePaletteSelectorProps) {
  const groupLabelId = useId();

  return (
    <div
      className="flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 shadow-xs"
      role="radiogroup"
      aria-labelledby={groupLabelId}
    >
      <span id={groupLabelId} className="sr-only">
        Theme palette
      </span>
      {themes.map((theme) => (
        <ThemePaletteDot
          key={theme.id}
          theme={theme}
          isActive={theme.id === activeThemeId}
          onSelect={onThemeChange}
        />
      ))}
    </div>
  );
}

type ThemePaletteDotProps = {
  theme: ThemeOption;
  isActive: boolean;
  onSelect: (themeId: ThemeId) => void;
};

function ThemePaletteDot({ theme, isActive, onSelect }: ThemePaletteDotProps) {
  const tooltipId = useId();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className={cn(
          "size-4 rounded-full border border-border transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary hover:cursor-pointer",
          isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "",
        )}
        style={{ backgroundColor: theme.swatchColor }}
        role="radio"
        aria-checked={isActive}
        aria-describedby={tooltipId}
        aria-label={`Use ${theme.label} theme`}
        onClick={() => onSelect(theme.id)}
      />
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max max-w-48 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-card-foreground opacity-0 shadow-xs transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span
          className="-top-1.5 absolute left-1/2 size-3 -translate-x-1/2 rotate-45 border-t border-l border-border bg-card"
          aria-hidden="true"
        />
        {theme.label}
      </span>
    </span>
  );
}
