import { content } from "@/content/content";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-hairline px-4 py-8 md:px-8">
      <div className="flex flex-col gap-3 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-[11px]">
          {content.name} · {content.role} · {content.schoolShort} ·{" "}
          {content.yearMark}
        </p>
        <a
          href="mailto:mmuskan_be24@thapar.edu"
          className="text-sm hover:text-text"
        >
          {content.contact.email}
        </a>
      </div>
    </footer>
  );
}
