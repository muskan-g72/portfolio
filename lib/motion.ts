"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeMobile(onChange: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, () => true);
}

export function useIsTablet() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches,
    () => false,
  );
}
