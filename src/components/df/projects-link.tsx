import Link from "next/link";
import type { ReactNode } from "react";

// Real routes use next/link; external URLs open in a new tab; /live/* and .pdf are not Next pages.
export function XLink({ href, className, children, tabIndex, ariaHidden }: { href: string; className?: string; children: ReactNode; tabIndex?: number; ariaHidden?: boolean }) {
  if (/^https?:/.test(href)) return <a href={href} className={className} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} aria-hidden={ariaHidden}>{children}</a>;
  if (href.startsWith("/live/") || href.endsWith(".pdf")) return <a href={href} className={className} tabIndex={tabIndex} aria-hidden={ariaHidden}>{children}</a>;
  return <Link href={href} className={className} tabIndex={tabIndex} aria-hidden={ariaHidden}>{children}</Link>;
}
