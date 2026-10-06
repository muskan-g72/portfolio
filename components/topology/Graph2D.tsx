"use client";

import { content } from "@/content/content";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useEffect, useId, useMemo, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  activeId: string | null;
  onSelect: (id: string) => void;
  compact?: boolean;
  className?: string;
};

export function Graph2D({ activeId, onSelect, compact, className }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const markerId = useId();

  const nodes = useMemo(
    () =>
      compact
        ? content.topology.filter((node) => node.id !== "campuspro")
        : content.topology,
    [compact],
  );

  const nodeMap = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  const edges = content.topologyEdges.filter(
    ([from, to]) => nodeMap[from] && nodeMap[to],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const lines = svg.querySelectorAll("[data-edge]");
    const particle = svg.querySelector("[data-particle]");

    if (reduced) {
      gsap.set([lines, particle], { opacity: 1, strokeDashoffset: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    gsap.set(lines, {
      opacity: 0.9,
      strokeDasharray: 180,
      strokeDashoffset: 180,
    });
    gsap.set(particle, { opacity: 0 });

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 0.38,
      stagger: 0.025,
    }).to(particle, { opacity: 1, duration: 0.18 }, 0.32);

    return () => {
      tl.kill();
    };
  }, [reduced, compact]);

  const trailIds = [
    "browser",
    "ui",
    "api",
    "auth",
    "budget",
    "executor",
    "trace",
    "response",
  ];

  const trail = trailIds.map((id) => nodeMap[id]).filter(Boolean);
  const pathD = trail
    .map((node, index) =>
      index === 0 ? `M ${node.x} ${node.y}` : `L ${node.x} ${node.y}`,
    )
    .join(" ");

  return (
    <div className={cn("relative h-full w-full", className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 1160 580"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${markerId}-line`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ece9e1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ece9e1" stopOpacity="0.32" />
          </linearGradient>
        </defs>
        {edges.map(([from, to]) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 12;
          return (
            <path
              key={`${from}-${to}`}
              data-edge
              d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
              fill="none"
              stroke={`url(#${markerId}-line)`}
              strokeWidth="1"
            />
          );
        })}
        {!reduced ? (
          <circle r="2.4" fill="#ece9e1" data-particle>
            <animateMotion dur="8s" repeatCount="indefinite" path={pathD} />
          </circle>
        ) : null}
      </svg>
      {nodes.map((node) => {
        const selected = activeId === node.id;
        return (
          <button
            key={node.id}
            type="button"
            onClick={() => onSelect(node.id)}
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            aria-pressed={selected}
            aria-label={`${node.label}. ${node.annotation?.body.join(" ") ?? ""} Used in ${node.annotation?.usedIn ?? "the execution path"}.`}
            className={cn(
              "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5",
              "text-center font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.14em] md:text-[10px]",
              selected ? "text-[#ece9e1]" : "text-[#ece9e1]/70",
            )}
            style={{
              left: `${(node.x / 1160) * 100}%`,
              top: `${(node.y / 580) * 100}%`,
            }}
          >
            <span
              className={cn(
                "block rounded-full border border-white/20",
                selected ? "h-2.5 w-2.5 bg-[var(--accent)]" : "h-1.5 w-1.5 bg-[#ece9e1]/80",
              )}
            />
            <span className="max-w-[7.5rem] leading-tight">{node.label}</span>
          </button>
        );
      })}
    </div>
  );
}
