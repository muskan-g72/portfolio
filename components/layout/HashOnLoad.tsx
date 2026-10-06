"use client";

import { jumpToHash } from "@/lib/nav";
import { useEffect } from "react";

export function HashOnLoad() {
  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => jumpToHash(window.location.hash));
    }
  }, []);
  return null;
}
