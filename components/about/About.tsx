import { content } from "@/content/content";

export function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mono text-[11px] text-muted">About</p>
          <h2 className="mt-4 max-w-md text-3xl tracking-[-0.04em] md:text-4xl">
            Who I am, and the problems I like.
          </h2>
        </div>
        <div className="measure space-y-6 text-lg leading-relaxed text-text/90">
          {content.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-10 border-t border-hairline pt-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mono text-[11px] text-muted">Academic</p>
          <h3 className="mt-3 text-2xl tracking-[-0.03em]">
            {content.education.school}
          </h3>
          <p className="mt-2 text-muted">{content.education.degree}</p>
          <p className="mono mt-4 text-sm tracking-normal text-text">
            {content.education.years}
          </p>
          <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-4xl tracking-[-0.04em]">
            {content.education.cgpa}
          </p>
          <p className="mono mt-2 text-[11px] text-muted">CGPA</p>
        </div>
        <div className="space-y-3">
          <p className="mono text-[11px] text-muted">Distinctions</p>
          {content.scholarships.map((item) => (
            <div key={item.value} className="border border-hairline px-4 py-3">
              <p className="mono text-[10px] text-muted">{item.label}</p>
              <p className="mt-1 text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <p className="mono text-[11px] text-muted">Skills</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(content.skills).map(([group, items]) => (
            <div key={group}>
              <p className="mono text-[10px] text-muted">{group}</p>
              <ul className="mt-3 space-y-1 text-sm text-text/90">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mono mt-12 text-[11px] text-muted">Currently exploring</p>
        <p className="mt-2 text-sm text-text/85">{content.exploring}</p>
      </div>
    </section>
  );
}
