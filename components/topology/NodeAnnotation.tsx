"use client";

import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/content/content";
import { usePrefersReducedMotion } from "@/lib/motion";

export function NodeAnnotation({ nodeId }: { nodeId: string | null }) {
  const reduced = usePrefersReducedMotion();
  const node = content.topology.find((item) => item.id === nodeId);
  const note = node?.annotation;
  if (!note) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={nodeId}
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: reduced ? 0 : 0.18 }}
        className="pointer-events-none absolute bottom-24 left-4 z-20 max-w-xs border border-hairline bg-[#0a0a0c]/88 px-4 py-3 md:left-auto md:right-8"
        aria-live="polite"
      >
        <p className="mono text-[10px] text-muted">{note.title}</p>
        {note.body.map((line) => (
          <p key={line} className="mt-1 text-sm text-text/90">
            {line}
          </p>
        ))}
        <p className="mono mt-3 text-[10px] text-muted">Used in</p>
        <p className="text-sm text-text">{note.usedIn}</p>
      </motion.aside>
    </AnimatePresence>
  );
}
