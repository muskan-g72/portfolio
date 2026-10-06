import { ArchitectureSvg } from "@/components/case/ArchitectureSvg";
import { ProductFrame } from "@/components/product/ProductFrame";
import { ColdStartDialog } from "@/components/ui/ColdStartDialog";
import { ExternalLink } from "@/components/ui/TextLink";
import type { Project } from "@/content/types";
import { adjacentProjects, content } from "@/content/content";

export function CaseStudy({ project }: { project: Project }) {
  const { prev, next } = adjacentProjects(project.slug);

  return (
    <article className="px-4 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mono text-[11px] text-muted">
          {project.order} · {project.category}
        </p>
        <h1 className="mt-4 text-5xl tracking-[-0.04em] md:text-7xl">
          {project.name}
        </h1>
        <p className="mt-6 text-xl text-text/90">{project.tagline}</p>
        <p className="mono mt-4 text-[11px] text-muted">{project.category}</p>
        <p className="mt-8 text-sm leading-relaxed text-muted">
          {project.stack.join(" · ")}
        </p>
        <div className="mt-10">
          <ProductFrame project={project} shotId={project.screenshots[0]?.id} />
        </div>

        <Section title="The problem">{project.problem}</Section>
        <Section title="The approach">{project.approach}</Section>

        <div className="mt-16">
          <p className="mono text-[11px] text-muted">Architecture</p>
          <div className="mt-6 border border-hairline p-4">
            <ArchitectureSvg graph={project.architecture} />
          </div>
        </div>

        <Section title="The engineering decision">{project.decision}</Section>
        <Section title="The proof">{project.proof}</Section>

        {project.proofVisual ? (
          <ol className="mt-6 space-y-2 border border-hairline p-4">
            {project.proofVisual.map((line) => (
              <li key={line} className="text-sm">
                {line}
              </li>
            ))}
          </ol>
        ) : null}

        <div className="mt-10">
          <p className="mono text-[11px] text-muted">Results</p>
          {project.slug === "verigate" ? (
            <p className="mt-3 text-sm text-muted">Metrics coming soon.</p>
          ) : (
            <ul className="mt-3 space-y-1 text-sm">
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {project.screenshots.length > 1 ? (
          <div className="mt-12">
            <p className="mono text-[11px] text-muted">Surfaces</p>
            <div className="mt-6 grid gap-6">
              {project.screenshots.slice(1).map((shot) => (
                <ProductFrame key={shot.id} project={project} shotId={shot.id} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-16 border border-hairline p-5">
          <p className="mono text-[11px] text-muted">Engineering truth</p>
          <p className="mt-3 text-sm leading-relaxed">{project.engineeringTruth}</p>
        </div>

        <Section title="What I learned">{project.learned}</Section>

        <div className="mt-12 flex flex-wrap gap-3">
          <ExternalLink
            href={project.github}
            className="border border-hairline px-3 py-2 text-sm"
          >
            GitHub
          </ExternalLink>
          {project.live ? (
            project.coldStart ? (
              <ColdStartDialog href={project.live}>
                <span className="border border-hairline px-3 py-2 text-sm">
                  Open live app
                </span>
              </ColdStartDialog>
            ) : (
              <ExternalLink
                href={project.live}
                className="border border-hairline px-3 py-2 text-sm"
              >
                Open live app
              </ExternalLink>
            )
          ) : null}
        </div>
        <p className="mono mt-8 text-[11px] text-muted">Capabilities</p>
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <nav className="mt-20 flex justify-between border-t border-hairline pt-8 text-sm">
          {prev ? (
            <a href={`/work/${prev.slug}`}>
              <span className="mono block text-[10px] text-muted">Previous</span>
              {prev.name}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`/work/${next.slug}`} className="text-right">
              <span className="mono block text-[10px] text-muted">Next</span>
              {next.name}
            </a>
          ) : null}
        </nav>
        <p className="sr-only">
          {content.name} · {content.projects.length} projects
        </p>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section className="mt-16">
      <h2 className="mono text-[11px] text-muted">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-text/90">{children}</p>
    </section>
  );
}
