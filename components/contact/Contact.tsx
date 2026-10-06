import { content } from "@/content/content";
import { ExternalLink } from "@/components/ui/TextLink";

export function Contact() {
  const { contact } = content;
  return (
    <section id="contact" className="relative z-10 scroll-mt-24 px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="mono text-[11px] text-muted">Response</p>
        <h2 className="mt-4 max-w-3xl text-5xl uppercase tracking-[-0.04em] md:text-7xl">
          {contact.headline}
        </h2>
        <p className="mt-6 text-lg text-muted">{contact.support}</p>
        <ul className="mt-12 space-y-3 text-lg">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <ExternalLink href={contact.linkedin}>{contact.linkedinLabel}</ExternalLink>
          </li>
          <li>
            <ExternalLink href={contact.github}>{contact.githubLabel}</ExternalLink>
          </li>
          <li>
            <a href={`tel:${contact.phone.replaceAll("-", "")}`}>{contact.phone}</a>
          </li>
        </ul>
        <a
          href="/resume.pdf"
          className="mt-10 inline-block border border-hairline px-4 py-2 text-sm"
        >
          Download resume
        </a>
      </div>
    </section>
  );
}
