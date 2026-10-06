"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { content } from "@/content/content";
import { cn } from "@/lib/cn";
import { jumpToHash } from "@/lib/nav";

const groups = ["Navigation", "Projects", "Actions"] as const;

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.commands.filter((item) =>
      q ? item.label.toLowerCase().includes(q) : true,
    );
  }, [query]);

  const run = useCallback(
    (href: string, external?: boolean) => {
      setOpen(false);
      setQuery("");
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      if (href.endsWith(".pdf")) {
        window.location.assign(href);
        return;
      }
      const hashIndex = href.indexOf("#");
      if (hashIndex >= 0 && (pathname === "/" || href.startsWith("#"))) {
        jumpToHash(href.slice(hashIndex));
        history.replaceState(null, "", href.slice(hashIndex));
        return;
      }
      router.push(href);
    },
    [pathname, router],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(
        "open-command-palette",
        onOpen as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    if (open) {
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => (value + 1) % Math.max(results.length, 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(
          (value) =>
            (value - 1 + Math.max(results.length, 1)) %
            Math.max(results.length, 1),
        );
      }
      if (event.key === "Enter" && results[active]) {
        event.preventDefault();
        run(results[active].href, results[active].external);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, open, results, run]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/55 px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-sm border border-hairline bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <label className="sr-only" htmlFor="command-input">
              Search commands
            </label>
            <input
              id="command-input"
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  const buttons = Array.from(
                    event.currentTarget
                      .closest('[role="dialog"]')
                      ?.querySelectorAll<HTMLElement>("button") ?? [],
                  );
                  if (!buttons.length) return;
                  event.preventDefault();
                  buttons[0]?.focus();
                }
              }}
              placeholder="Go to work, a project, resume…"
              className="w-full border-b border-hairline bg-transparent px-4 py-3 text-sm text-text outline-none placeholder:text-muted"
            />
            <div className="max-h-80 overflow-y-auto py-2">
              {groups.map((group) => {
                const items = results.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} className="px-2 py-1">
                    <p className="mono px-2 py-1 text-[10px] text-muted">
                      {group}
                    </p>
                    {items.map((item) => {
                      const index = results.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={() => run(item.href, item.external)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm",
                            index === active
                              ? "bg-white/6 text-text"
                              : "text-muted",
                          )}
                        >
                          <span>{item.label}</span>
                          <span className="mono text-[10px] tracking-widest">
                            {item.group === "Actions" ? "GO" : "OPEN"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
              {!results.length ? (
                <p className="px-4 py-6 text-sm text-muted">No matches.</p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true }),
  );
}
