"use client";

import { useProjectTheme } from "@/lib/theme";
import { useEffect } from "react";

export function ProjectThemeSync({ slug }: { slug: string }) {
  const { setProject } = useProjectTheme();
  useEffect(() => {
    setProject(slug);
    return () => setProject(null);
  }, [setProject, slug]);
  return null;
}
