"use client";

import { createContext, useContext, type CSSProperties } from "react";
import type { ProjectTheme } from "@/content/types";

export const defaultTheme: ProjectTheme = {
  bg: "#0a0a0c",
  accentFrom: "#ece9e1",
  accentTo: "#8d8b86",
  accentSolid: "#ece9e1",
};

export type ThemeContextValue = {
  slug: string | null;
  theme: ProjectTheme;
  setProject: (slug: string | null) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  slug: null,
  theme: defaultTheme,
  setProject: () => undefined,
});

export function useProjectTheme() {
  return useContext(ThemeContext);
}

export function themeCssVars(theme: ProjectTheme) {
  return {
    "--bg": theme.bg,
    "--accent-from": theme.accentFrom,
    "--accent-to": theme.accentTo,
    "--accent": theme.accentSolid,
  } as CSSProperties;
}
