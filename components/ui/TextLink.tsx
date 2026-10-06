import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("transition-colors hover:text-text", className)}
    >
      {children}
    </a>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <ExternalLink href={href} className={className}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <a href={href} className={cn("transition-colors hover:text-text", className)}>
      {children}
    </a>
  );
}
