import { content } from "@/content/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume — Muskan, Software Engineer.",
};

export default function ResumePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-4 py-24 outline-none md:px-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mono text-[11px] text-muted">Document</p>
          <h1 className="mt-2 text-4xl tracking-[-0.04em]">
            {content.name} — Resume
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/resume.pdf"
            download="Muskan_Resume.pdf"
            className="border border-hairline bg-text px-4 py-2 text-sm text-bg"
          >
            Download PDF
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hairline px-4 py-2 text-sm text-text"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <div className="mt-8 h-[80vh] w-full overflow-hidden rounded-sm border border-hairline bg-surface">
        <iframe
          src="/resume.pdf"
          title="Muskan Resume"
          className="h-full w-full border-0"
        />
      </div>
    </main>
  );
}
