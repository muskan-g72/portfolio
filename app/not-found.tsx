import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80dvh] flex-col items-start justify-center px-8">
      <p className="mono text-[11px] text-muted">404</p>
      <h1 className="mt-3 text-4xl tracking-[-0.04em]">Route not found.</h1>
      <Link href="/" className="mt-8 border border-hairline px-4 py-2 text-sm">
        Return
      </Link>
    </main>
  );
}
