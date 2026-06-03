import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

export function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const nextThemeMode = themeMode === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.style.colorScheme = themeMode;
  }, [themeMode]);

  return {
    themeMode,
    nextThemeMode,
    toggleThemeMode: () =>
      setThemeMode((currentThemeMode) =>
        currentThemeMode === "dark" ? "light" : "dark",
      ),
  };
}
