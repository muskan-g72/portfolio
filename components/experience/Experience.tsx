"use client";

import { content } from "@/content/content";
import { setScrollScene } from "@/lib/scroll-scene";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const exp = content.experience;

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 40%",
        onUpdate: (self) => setScrollScene({ experience: self.progress }),
        onLeave: () => setScrollScene({ experience: 0 }),
        onLeaveBack: () => setScrollScene({ experience: 0 }),
      });
      gsap.fromTo(
        nodeRef.current,
        { opacity: 0.35, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "center center",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 scroll-mt-24 px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mono text-[11px] text-muted">Experience</p>
          <p className="mono mt-6 text-[11px] text-muted">{exp.dates}</p>
          <h2 className="mt-3 text-3xl tracking-[-0.04em] md:text-4xl">
            {exp.title}
          </h2>
          <p className="mt-2 text-lg text-text/90">{exp.company}</p>
          <p className="text-sm text-muted">{exp.location}</p>
          <p className="mt-6 text-sm text-muted">Project</p>
          <p className="mt-1 max-w-md text-text">{exp.project}</p>
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-text/85">
            {(open
              ? [...exp.bulletsPrimary, ...exp.bulletsMore]
              : exp.bulletsPrimary
            ).map((bullet) => (
              <li key={bullet} className="border-l border-hairline pl-4">
                {bullet}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mono mt-6 text-[11px] text-muted hover:text-text"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            {open ? "Show less" : "Implementation details"}
          </button>
          <div className="mt-8">
            <a
              href={exp.certificateHref}
              className="mono text-[11px] text-text underline decoration-hairline underline-offset-4"
            >
              {exp.certificateLabel}
            </a>
            <p className="mt-2 text-xs text-muted">
              Placeholder file until the signed certificate is added.
            </p>
          </div>
        </div>
        <div className="relative min-h-56">
          <div
            ref={nodeRef}
            className="border border-hairline bg-bg/70 p-6"
          >
            <p className="mono text-[10px] text-muted">Node · campuspro</p>
            <p className="mt-4 text-sm text-text/90">
              Attendance module on the same execution path as the rest of the
              work: design, HRMS integration, database, testing.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
              api
              <span className="h-px flex-1 bg-hairline" />
              <span className="h-2 w-2 rounded-full bg-text" />
              campuspro
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
