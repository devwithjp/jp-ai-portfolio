"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-sm text-accent-fg">
            JP
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-elevated text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  isActive(item.href) ? "bg-elevated text-fg" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}, {site.role}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
            LinkedIn
          </a>
          <a href={site.links.email} className="text-muted hover:text-fg">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
