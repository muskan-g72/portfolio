"use client";

import { TopologyStage } from "@/components/topology/TopologyStage";
import { content } from "@/content/content";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";
import { jumpToHash } from "@/lib/nav";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [filled, setFilled] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setFilled(true);
      return;
    }
    const fill = window.setTimeout(() => setFilled(true), 280);
    return () => window.clearTimeout(fill);
  }, [reduced]);

  const [before, after] = content.headline.split(content.headlineEmphasis);
  const introDelay = reduced ? 0 : 0.38;

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100dvh] flex-col overflow-hidden px-4 pb-16 pt-24 md:justify-end md:px-8 md:pt-24 md:pb-16"
    >
      <div className="pointer-events-none absolute left-4 top-16 z-10 hidden md:block md:left-8">
        <p className="mono text-[10px] text-muted">
          {content.role} / {content.schoolShort} / {content.yearMark}
        </p>
      </div>
      <p className="pointer-events-none absolute right-4 top-[45%] hidden origin-center translate-x-1/2 rotate-90 mono text-[10px] text-muted lg:block">
        {content.location}
      </p>

      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <div className="pointer-events-auto h-full">
          <TopologyStage />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center md:flex-none md:justify-end">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          <h1 className={cn("display-name", filled && "is-filled")}>
            {content.displayName}
          </h1>
          <p className="mono mt-4 text-[11px] text-muted">
            {content.role} · {content.schoolShort} · {content.yearMark}
          </p>
          <p className="mt-2 max-w-md text-xs text-muted md:mx-auto md:text-sm">
            {content.school}
          </p>
        </motion.div>

        <div className="relative mt-8 h-52 w-full max-w-xl md:hidden">
          <TopologyStage compact />
        </div>
      </div>

      <motion.div
        className="relative z-10 mx-auto mt-6 w-full max-w-6xl md:mt-10"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.22, delay: introDelay }}
      >
        <p className="max-w-xl text-balance text-xl leading-snug tracking-[-0.03em] text-text md:text-2xl">
          {before}
          <span className="accent-emphasis">{content.headlineEmphasis}</span>
          {after}
        </p>
        <p className="mono mt-6 text-[11px] text-accent">{content.status}</p>
        <p className="mt-3 text-sm text-muted">{content.previously}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="border border-hairline bg-text px-4 py-2 text-sm text-bg"
            onClick={(event) => {
              event.preventDefault();
              jumpToHash("#work");
            }}
          >
            View work
          </a>
          <a
            href="/resume.pdf"
            className="border border-hairline px-4 py-2 text-sm text-text"
          >
            Resume
          </a>
        </div>
      </motion.div>

      <p className="mono pointer-events-none absolute bottom-6 left-4 z-10 text-[10px] text-muted md:left-8">
        Scroll
      </p>
    </section>
  );
}
