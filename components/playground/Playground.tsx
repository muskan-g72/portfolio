"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const WINDOW_MS = 10_000;
const LIMIT = 8;

const VERIFICATION_STEPS = [
  { id: "tests", label: "Pytest / Playwright" },
  { id: "evidence", label: "Evidence bound to a run" },
  { id: "pr", label: "GitHub PR · HMAC · commit status" },
  { id: "report", label: "Export PDF / JSON" },
] as const;

export function VeriGateTrace() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  async function run() {
    setRunning(true);
    setDone(false);
    for (let i = 0; i < VERIFICATION_STEPS.length; i += 1) {
      setStep(i);
      await new Promise((resolve) => setTimeout(resolve, 220));
    }
    setDone(true);
    setRunning(false);
  }

  return (
    <div className="border border-hairline p-4">
      <div className="flex items-center justify-between">
        <p className="mono text-[10px] text-muted">VeriGate</p>
        <span className="mono border border-hairline px-2 py-0.5 text-[9px] text-muted">
          Simulated demo
        </span>
      </div>
      <h3 className="mt-2 text-xl tracking-[-0.03em]">Verification trace</h3>
      <p className="mt-2 text-sm text-muted">
        Evidence → PR checks → report. No invented pass rates.
      </p>
      <ol className="mt-4 space-y-2">
        {VERIFICATION_STEPS.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "flex items-center gap-3 text-sm",
              index === step ? "text-text" : "text-muted",
              done && "text-[var(--ok)]",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                index <= step ? "bg-text" : "bg-text/30",
              )}
            />
            {item.label}
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="mt-4 border border-hairline px-3 py-2 text-sm"
        onClick={run}
        disabled={running}
      >
        Bind a run to a release
      </button>
      {done ? (
        <p className="mt-4 text-sm text-muted">
          Trace complete. Quantitative production metrics are not published yet.
        </p>
      ) : null}
    </div>
  );
}

export function RateLimiterDemo() {
  const [stamps, setStamps] = useState<number[]>([]);
  const [log, setLog] = useState<Array<{ t: number; ok: boolean }>>([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const active = stamps.filter((stamp) => now - stamp < WINDOW_MS).length;

  function send(count = 1) {
    const at = Date.now();
    const current = stamps.filter((stamp) => at - stamp < WINDOW_MS);
    const nextStamps = [...current];
    const nextLog: Array<{ t: number; ok: boolean }> = [];
    for (let i = 0; i < count; i += 1) {
      if (nextStamps.length < LIMIT) {
        nextStamps.push(at + i);
        nextLog.push({ t: at + i, ok: true });
      } else {
        nextLog.push({ t: at + i, ok: false });
      }
    }
    setStamps(nextStamps);
    setLog((prev) => [...nextLog, ...prev].slice(0, 12));
  }

  return (
    <div className="border border-hairline p-4">
      <div className="flex items-center justify-between">
        <p className="mono text-[10px] text-muted">RateShield</p>
        <span className="mono border border-hairline px-2 py-0.5 text-[9px] text-muted">
          Simulated demo
        </span>
      </div>
      <h3 className="mt-2 text-xl tracking-[-0.03em]">Sliding-window limiter</h3>
      <p className="mt-2 text-sm text-muted">
        10 second rolling window · 8 request limit
      </p>
      <p className="mono mt-4 text-sm tracking-normal">
        Active: {Math.min(active, LIMIT)} / {LIMIT}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="border border-hairline px-3 py-2 text-sm"
          onClick={() => send(1)}
        >
          Send request
        </button>
        <button
          type="button"
          className="border border-hairline px-3 py-2 text-sm"
          onClick={() => send(12)}
        >
          Burst of 12
        </button>
        <button
          type="button"
          className="border border-hairline px-3 py-2 text-sm"
          onClick={() => {
            setStamps([]);
            setLog([]);
          }}
        >
          Reset
        </button>
      </div>
      <ul className="mt-4 space-y-1 font-[family-name:var(--font-jetbrains)] text-xs">
        {log.map((item) => (
          <li
            key={item.t}
            className={item.ok ? "text-[var(--ok)]" : "text-[var(--deny)]"}
          >
            {item.ok ? "200 OK" : "429"}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PIPELINE = [
  { id: "auth", label: "Auth / Virtual Key" },
  { id: "budget", label: "Budget / Atomic UPDATE" },
  { id: "executor", label: "Executor / Task Pipeline" },
  { id: "groq", label: "Groq / Primary" },
  { id: "gemini", label: "Gemini / Fallback" },
  { id: "validator", label: "Validator / JSON + Repair" },
  { id: "trace", label: "Trace / PostgreSQL" },
] as const;

export function OrchestrixRace() {
  const [running, setRunning] = useState(false);
  const [failPrimary, setFailPrimary] = useState(false);
  const [result, setResult] = useState<{ admitted: number; rejected: number } | null>(
    null,
  );
  const [activeStage, setActiveStage] = useState(-1);
  const [slots, setSlots] = useState<Array<"pending" | "ok" | "deny">>([]);

  async function race() {
    setRunning(true);
    setResult(null);
    setSlots(Array.from({ length: 10 }, () => "pending"));
    for (let i = 0; i < PIPELINE.length; i += 1) {
      setActiveStage(i);
      await new Promise((resolve) => setTimeout(resolve, 160));
      if (i === 1) {
        setResult({ admitted: 1, rejected: 9 });
        setSlots(["ok", ...Array.from({ length: 9 }, () => "deny" as const)]);
      }
    }
    setRunning(false);
  }

  return (
    <div className="border border-hairline p-4">
      <div className="flex items-center justify-between">
        <p className="mono text-[10px] text-muted">Orchestrix</p>
        <span className="mono border border-hairline px-2 py-0.5 text-[9px] text-muted">
          Simulated demo
        </span>
      </div>
      <h3 className="mt-2 text-xl tracking-[-0.03em]">Execution topology</h3>
      <ol className="mt-4 space-y-2">
        {PIPELINE.map((stage, index) => {
          const failed = failPrimary && stage.id === "groq";
          const fallback = failPrimary && stage.id === "gemini";
          return (
            <li
              key={stage.id}
              className={cn(
                "flex items-center gap-3 text-sm",
                index === activeStage ? "text-text" : "text-muted",
                failed && "text-[var(--deny)]",
                fallback && index === activeStage && "text-[var(--ok)]",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  index === activeStage ? "bg-text" : "bg-text/30",
                  failed && "bg-[var(--deny)]",
                )}
              />
              {stage.label}
              {failed ? (
                <span className="mono text-[9px] tracking-widest">Fail</span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="border border-hairline px-3 py-2 text-sm"
          onClick={() => setFailPrimary((value) => !value)}
          aria-pressed={failPrimary}
        >
          {failPrimary ? "Primary failing" : "Simulate primary failure"}
        </button>
        <button
          type="button"
          className="border border-hairline px-3 py-2 text-sm"
          onClick={race}
          disabled={running}
        >
          Run budget race
        </button>
      </div>
      {slots.length ? (
        <div className="mt-4 grid grid-cols-10 gap-1" aria-hidden>
          {slots.map((slot, index) => (
            <span
              key={index}
              className={cn(
                "h-6 border border-hairline",
                slot === "ok" && "bg-[var(--ok)]/40",
                slot === "deny" && "bg-[var(--deny)]/35",
              )}
            />
          ))}
        </div>
      ) : null}
      {result ? (
        <div className="mt-5 border border-hairline p-3 text-sm">
          <p>10 simultaneous requests</p>
          <p className="mt-1">{result.admitted} admitted</p>
          <p>{result.rejected} rejected</p>
          <p className="mt-2 text-muted">zero oversubscription</p>
          <p className="mono mt-2 border-t border-hairline pt-2 text-[10px] text-muted">
            Recorded results from benchmarks in the repo
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function TaskForgeChart() {
  const rows = useMemo(
    () => [
      { label: "1 worker", value: 63, max: 481 },
      { label: "8 workers", value: 481, max: 481 },
    ],
    [],
  );

  return (
    <div className="border border-hairline p-4">
      <div className="flex items-center justify-between">
        <p className="mono text-[10px] text-muted">TaskForge</p>
        <span className="mono border border-hairline px-2 py-0.5 text-[9px] text-muted">
          Recorded results from benchmarks in the repo
        </span>
      </div>
      <h3 className="mt-2 text-xl tracking-[-0.03em]">Throughput</h3>
      <p className="mt-2 text-sm text-muted">
        Measured jobs / s. No interpolated values.
      </p>
      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between text-sm">
              <span>{row.label}</span>
              <span className="font-[family-name:var(--font-jetbrains)]">
                {row.value} jobs/s
              </span>
            </div>
            <div
              className="mt-2 h-2 bg-hairline/60"
              role="img"
              aria-label={`${row.label}: ${row.value} jobs per second`}
            >
              <div
                className="h-2 bg-text"
                style={{ width: `${(row.value / row.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Playground() {
  return (
    <section
      id="playground"
      className="relative z-10 scroll-mt-24 px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono text-[11px] text-muted">Playground</p>
        <h2 className="mt-3 max-w-lg text-3xl tracking-[-0.04em]">
          Optional models of the systems — not required to read the work.
        </h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <VeriGateTrace />
          <RateLimiterDemo />
          <OrchestrixRace />
          <TaskForgeChart />
        </div>
      </div>
    </section>
  );
}
