"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  useIsMobile,
  useIsTablet,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { getScrollScene, subscribeScrollScene } from "@/lib/scroll-scene";

const Topology3D = dynamic(() => import("@/components/topology/Topology3D"), {
  ssr: false,
});

export function TopologyBackdrop() {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [opacity, setOpacity] = useState(0.55);
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = Boolean(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
      );
      setWebgl(ok);
    } catch {
      setWebgl(false);
    }
  }, []);

  useEffect(() => {
    if (mobile || tablet || reduced) return;
    const start = () => setReady(true);
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(start, { timeout: 1400 });
      return () => window.cancelIdleCallback(id);
    }
    const timeout = window.setTimeout(start, 450);
    return () => window.clearTimeout(timeout);
  }, [mobile, reduced, tablet]);

  useEffect(() => {
    const update = () => {
      const scene = getScrollScene();
      const fade = Math.max(0, 1 - scene.handoff * 1.4 - scene.works * 2);
      setOpacity(0.22 + fade * 0.5);
    };
    update();
    return subscribeScrollScene(update);
  }, []);

  if (!webgl || mobile || tablet || reduced || !ready) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{ opacity }}
      aria-hidden
    >
      <Topology3D />
    </div>
  );
}
