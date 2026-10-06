"use client";

import { ProductFrame } from "@/components/product/ProductFrame";
import { ColdStartDialog } from "@/components/ui/ColdStartDialog";
import { ExternalLink } from "@/components/ui/TextLink";
import { content } from "@/content/content";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";
import { setScrollScene } from "@/lib/scroll-scene";
import { useProjectTheme } from "@/lib/theme";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectBody({ project }: { project: Project }) {
  const shots = project.screenshots.filter((shot) => shot.src);
  const [shotId, setShotId] = useState(
    shots[0]?.id ?? project.screenshots[0]?.id,
  );

  return (
    <div>
      <p className="mono text-[11px] text-muted">{project.category}</p>
      <h2 className="mt-2 text-4xl tracking-[-0.04em] md:text-5xl">
        {project.name}
      </h2>
      <p className="mt-4 max-w-xl text-lg text-text/90">{project.tagline}</p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <p className="mt-6 max-w-xl text-sm text-text/90">
        <span className="mono mr-2 text-[10px] text-muted">Highlight</span>
        {project.highlight}
      </p>
      <p className="mono mt-6 text-[10px] text-muted">Stack</p>
      <p className="mt-2 max-w-xl text-sm text-text/80">
        {project.stack.join(" · ")}
      </p>
      {shots.length > 1 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {shots.map((shot) => (
            <button
              key={shot.id}
              type="button"
              onClick={() => setShotId(shot.id)}
              className={cn(
                "mono border border-hairline px-2 py-1 text-[10px]",
                shotId === shot.id ? "text-text" : "text-muted",
              )}
            >
              {shot.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-8">
        <ProductFrame project={project} shotId={shotId} />
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a
          href={`/work/${project.slug}`}
          className="border border-hairline px-3 py-2"
        >
          View case study
        </a>
        {project.live ? (
          project.coldStart ? (
            <ColdStartDialog href={project.live}>
              <span className="border border-hairline px-3 py-2">Open live app</span>
            </ColdStartDialog>
          ) : (
            <ExternalLink
              href={project.live}
              className="border border-hairline px-3 py-2"
            >
              Open live app
            </ExternalLink>
          )
        ) : null}
        <ExternalLink
          href={project.github}
          className="border border-hairline px-3 py-2"
        >
          GitHub
        </ExternalLink>
      </div>
    </div>
  );
}

export function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const stacked = reduced || mobile;
  const { setProject, theme } = useProjectTheme();
  const [index, setIndex] = useState(0);
  const project = content.projects[index];

  useEffect(() => {
    setProject(project.slug);
  }, [project.slug, setProject]);

  useEffect(() => {
    return () => setProject(null);
  }, [setProject]);

  useEffect(() => {
    if (!sectionRef.current || stacked) return;
    const el = sectionRef.current;
    const steps = content.projects.length;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${steps * 70}%`,
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const i = Math.min(
          steps - 1,
          Math.floor(self.progress * steps + 0.001),
        );
        setIndex(i);
        setScrollScene({ works: self.progress, activeProject: i });
      },
    });
    triggerRef.current = trigger;
    return () => {
      triggerRef.current = null;
      trigger.kill();
    };
  }, [stacked]);

  function selectProject(i: number) {
    setIndex(i);
    const trigger = triggerRef.current;
    if (!trigger) return;
    const steps = content.projects.length;
    const progress = (i + 0.2) / steps;
    trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 scroll-mt-24 px-4 py-20 md:px-8"
      style={{
        background: stacked
          ? "#0a0a0c"
          : `color-mix(in srgb, ${theme.bg} 55%, #0a0a0c)`,
        transition: stacked || reduced ? undefined : "background 500ms linear",
      }}
    >
      {!stacked ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accentFrom}0d 70%)`,
          }}
          aria-hidden
        />
      ) : null}

      {stacked ? (
        <div className="relative mx-auto max-w-6xl space-y-24">
          <p className="mono text-[11px] text-muted">Works</p>
          {content.projects.map((item) => (
            <article key={item.slug} className="scroll-mt-24">
              <ProjectBody project={item} />
            </article>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto grid min-h-[80dvh] max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mono text-[11px] text-muted">Works</p>
            <ol className="mt-8 space-y-4">
              {content.projects.map((item, i) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => selectProject(i)}
                    className={cn(
                      "block w-full text-left",
                      i === index ? "text-text" : "text-muted",
                    )}
                  >
                    <span className="mono text-[10px]">
                      {item.order} — {item.category}
                    </span>
                    <span className="mt-1 block text-lg tracking-[-0.03em]">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <ProjectBody project={project} />
        </div>
      )}
    </section>
  );
}
