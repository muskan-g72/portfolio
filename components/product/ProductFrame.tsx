import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

const callouts: Record<string, Array<{ id: string; label: string }>> = {
  verigate: [
    { id: "dashboard", label: "Verification dashboard" },
    { id: "evidence", label: "Test evidence" },
    { id: "pr", label: "GitHub PR verification" },
    { id: "diagnostics", label: "Failure diagnostics" },
    { id: "report", label: "Audit-ready report" },
  ],
  orchestrix: [
    { id: "auth", label: "Auth / virtual key" },
    { id: "budget", label: "Atomic budget UPDATE" },
    { id: "trace", label: "Execution trace" },
  ],
  rateshield: [
    { id: "keys", label: "API keys" },
    { id: "window", label: "Sliding window" },
    { id: "health", label: "System health" },
  ],
  taskforge: [
    { id: "queue", label: "Bounded queue" },
    { id: "pool", label: "Thread pool" },
    { id: "proof", label: "1 → 63 jobs/s · 8 → 481 jobs/s" },
  ],
};

export function ProductFrame({
  project,
  shotId,
  className,
}: {
  project: Project;
  shotId?: string;
  className?: string;
}) {
  const notes = callouts[project.slug] ?? [];
  const shot =
    project.screenshots.find((item) => item.id === shotId) ??
    project.screenshots[0];

  return (
    <figure
      className={cn(
        "flex h-full min-h-56 flex-col border border-hairline bg-[#07070a]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
        <span className="mono ml-2 truncate text-[10px] text-muted">
          {project.name.toLowerCase()} · {shot.label}
        </span>
      </div>
      <div className="relative min-h-48 flex-1 overflow-hidden">
        {shot.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={shot.caption}
            className="h-full w-full object-contain object-top bg-[#07070a]"
          />
        ) : (
          <div className="flex h-full min-h-48 flex-col justify-between p-4">
            <p className="max-w-sm text-sm text-text/80">{shot.caption}</p>
            <p className="mono text-[10px] text-muted">
              Open the live app or GitHub for this surface
            </p>
          </div>
        )}
        {shot.src && notes.length ? (
          <ol className="pointer-events-none absolute inset-x-3 bottom-3 hidden gap-2 sm:flex">
            {notes.slice(0, 3).map((note, index) => (
              <li
                key={note.id}
                className="border border-hairline bg-[#0a0a0c]/80 px-2 py-1 mono text-[9px] text-[#ece9e1]/80"
              >
                {String(index + 1).padStart(2, "0")} {note.label}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
      <figcaption className="border-t border-hairline px-3 py-3">
        <p className="text-xs text-muted">{shot.caption}</p>
        <ol className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {notes.map((note, index) => (
            <li key={note.id} className="mono text-[10px] text-muted">
              {String(index + 1).padStart(2, "0")} {note.label}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
