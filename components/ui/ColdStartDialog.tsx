"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ColdStartDialog({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-left">
        {children}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cold-start-title"
              className="w-full max-w-sm border border-hairline bg-surface p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p id="cold-start-title" className="text-sm text-text">
                This demo may take about a minute to wake up.
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-hairline bg-text px-3 py-2 text-sm text-bg"
                >
                  Open live app
                </a>
                <button
                  type="button"
                  className="border border-hairline px-3 py-2 text-sm"
                  onClick={() => setOpen(false)}
                >
                  Stay here
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
