"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { content } from "@/content/content";
import { defaultTheme, ThemeContext } from "@/lib/theme";

export function ThemeProvider({
  children,
  initialSlug = null,
}: {
  children: ReactNode;
  initialSlug?: string | null;
}) {
  const [slug, setSlug] = useState<string | null>(initialSlug);

  const setProject = useCallback((next: string | null) => {
    setSlug(next);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.documentElement.classList.toggle("reduce-motion", media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const theme = useMemo(() => {
    const project = content.projects.find((item) => item.slug === slug);
    return project?.theme ?? defaultTheme;
  }, [slug]);

  return (
    <ThemeContext.Provider value={{ slug, theme, setProject }}>
      <div
        className="min-h-full"
        style={
          {
            "--accent": theme.accentSolid,
            "--accent-from": theme.accentFrom,
            "--accent-to": theme.accentTo,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
