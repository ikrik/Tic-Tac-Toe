import { useEffect, useState } from "react";

export type ThemeId = "amber-minimal" | "claymorphism" | "cyberpunk";
export type ThemeMode = "dark" | "light";

export type ThemeOption = {
  id: ThemeId;
  label: string;
  swatchColor: string;
};

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "amber-minimal",
    label: "Amber Minimal",
    swatchColor: "#f59e0b",
  },
  {
    id: "claymorphism",
    label: "Claymorphism",
    swatchColor: "#6366f1",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    swatchColor: "#ff00c8",
  },
];

export function useThemeMode() {
  const [themeId, setThemeId] = useState<ThemeId>("amber-minimal");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const nextThemeMode = themeMode === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
    document.documentElement.dataset.themeMode = themeMode;
    document.documentElement.style.colorScheme = themeMode;
  }, [themeId, themeMode]);

  return {
    themeId,
    themeMode,
    nextThemeMode,
    setThemeId,
    toggleThemeMode: () =>
      setThemeMode((currentThemeMode) =>
        currentThemeMode === "dark" ? "light" : "dark",
      ),
  };
}
