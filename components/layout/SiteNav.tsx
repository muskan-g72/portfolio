"use client";

import { content } from "@/content/content";
import { jumpToHash } from "@/lib/nav";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

function go(event: MouseEvent<HTMLAnchorElement>, href: string, home: boolean) {
  if (!href.startsWith("/#") && !href.startsWith("#")) return;
  const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
  if (home) {
    event.preventDefault();
    jumpToHash(hash);
    history.replaceState(null, "", hash);
  }
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-bg/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <a
          href={onHome ? "#top" : "/"}
          className="pointer-events-auto mono text-[11px] text-text"
          onClick={(event) => {
            if (onHome) {
              event.preventDefault();
              jumpToHash("#top");
              history.replaceState(null, "", "#top");
            }
          }}
        >
          {content.displayName}
        </a>
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-6 md:flex"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mono text-[11px] text-muted transition-colors hover:text-text"
              onClick={(event) => go(event, item.href, onHome)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="pointer-events-auto flex items-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="mono text-[11px] text-muted hover:text-text"
          >
            Resume
          </a>
          <button
            type="button"
            className="mono text-[11px] text-muted hover:text-text"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            aria-label="⌘ K, open command palette"
          >
            ⌘ K
          </button>
        </div>
      </div>
      <nav
        aria-label="Sections"
        className="pointer-events-auto flex gap-4 overflow-x-auto px-4 pb-3 md:hidden"
      >
        {content.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mono shrink-0 text-[10px] text-muted"
            onClick={(event) => {
              if (onHome) go(event, item.href, true);
              else router.push(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-text focus:border focus:border-hairline"
    >
      Skip to content
    </a>
  );
}
