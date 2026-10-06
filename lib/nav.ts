"use client";

export function jumpToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "auto", block: "start" });
}
