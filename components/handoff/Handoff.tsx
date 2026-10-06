"use client";

import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";
import { setScrollScene } from "@/lib/scroll-scene";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductFrame } from "@/components/product/ProductFrame";
import { getProject } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export function Handoff() {
  const pinRef = useRef<HTMLElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const project = getProject("verigate");

  useEffect(() => {
    if (!pinRef.current || reduced || mobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1.1,
          onUpdate: (self) => setScrollScene({ handoff: self.progress }),
        },
      });

      gsap.set(frameRef.current, { opacity: 0, scale: 0.84 });
      tl.to(nodeRef.current, {
        width: 720,
        height: 420,
        borderRadius: 4,
        duration: 1,
        ease: "power2.inOut",
      }).to(
        frameRef.current,
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
        0.35,
      );
    }, pinRef);

    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section
      ref={pinRef}
      className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4"
      aria-label="Transition into work"
    >
      <div
        ref={nodeRef}
        className={`relative overflow-hidden border border-hairline bg-surface ${
          reduced || mobile
            ? "h-[min(420px,70dvh)] w-full max-w-3xl"
            : "flex h-16 w-16 items-center justify-center"
        }`}
      >
        <span className="absolute h-2 w-2 rounded-full bg-text" />
        <div ref={frameRef} className="absolute inset-0">
          {project ? (
            <ProductFrame
              project={project}
              shotId="landing"
              className="h-full min-h-0"
            />
          ) : null}
        </div>
      </div>
      <p className="mono pointer-events-none absolute bottom-10 text-[11px] text-muted">
        Topology → VeriGate → Works
      </p>
    </section>
  );
}
