import { content } from "@/content/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume — Muskan, software engineer.",
};

export default function ResumePage() {
  const exp = content.experience;
  return (
    <main className="mx-auto max-w-3xl px-4 py-28">
      <p className="mono text-[11px] text-muted">Resume</p>
      <h1 className="mt-3 text-5xl tracking-[-0.04em]">{content.name}</h1>
      <p className="mt-2 text-muted">
        {content.role} · {content.school} · {content.education.years}
      </p>
      <p className="mt-6 text-sm">
        <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
        {" · "}
        {content.contact.phone}
      </p>
      <p className="mt-2 text-sm text-muted">{content.status}</p>
      <a
        href="/resume.pdf"
        className="mt-8 inline-block border border-hairline px-4 py-2 text-sm"
      >
        Download resume
      </a>

      <section className="mt-12">
        <h2 className="mono text-[11px] text-muted">Education</h2>
        <p className="mt-3">{content.education.school}</p>
        <p className="text-sm text-muted">{content.education.degree}</p>
        <p className="font-[family-name:var(--font-jetbrains)] mt-2">
          CGPA {content.education.cgpa}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mono text-[11px] text-muted">Experience</h2>
        <p className="mt-3">
          {exp.title} · {exp.company}
        </p>
        <p className="text-sm text-muted">
          {exp.location} · {exp.dates}
        </p>
        <p className="mt-2 text-sm">{exp.project}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
          {[...exp.bulletsPrimary, ...exp.bulletsMore].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mono text-[11px] text-muted">Selected work</h2>
        <ul className="mt-4 space-y-4">
          {content.projects.map((project) => (
            <li key={project.slug}>
              <p className="text-text">{project.name}</p>
              <p className="text-sm text-muted">{project.tagline}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mono text-[11px] text-muted">Distinctions</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {content.scholarships.map((item) => (
            <li key={item.value}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-muted">
        Prefer a file? Use Download resume. This page is the readable record.
      </p>
    </main>
  );
}
