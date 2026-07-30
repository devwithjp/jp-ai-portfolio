import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="kicker kicker-accent">{children}</span>;
}

/* `index` is accepted for backward compatibility but no longer rendered
   (section-number eyebrows read as templated). Eyebrow is a mono kicker. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  index?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className="tick" aria-hidden />
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="font-display display-xl mt-4 text-fg">{title}</h2>
      {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <As className={`surface lift p-6 ${className}`}>{children}</As>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "live" | "mock-demo" | "planned" }) {
  const map = {
    live: { label: "Live", dot: "bg-accent" },
    "mock-demo": { label: "Mock demo", dot: "bg-accent" },
    planned: { label: "Planned", dot: "bg-muted" },
  } as const;
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function CTA({ href, children, variant = "primary", external, className = "" }: CTAProps) {
  const base =
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:shadow-[0_14px_44px_-14px_var(--accent)]"
      : "border border-line bg-surface text-fg hover:border-accent/50";
  const cls = `${base} ${styles} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// Renders markdown-lite paragraphs: a string array where lines beginning with
// "- " become a bulleted list. Keeps content data plain without an MDX toolchain.
export function Prose({ blocks }: { blocks: string[] }) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={key} className="my-3 ml-1 space-y-2">
          {list.map((li, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span className="leading-relaxed">{li}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  blocks.forEach((b, i) => {
    if (b.startsWith("- ")) {
      list.push(b.slice(2));
    } else {
      flush(`l-${i}`);
      out.push(
        <p key={`p-${i}`} className="leading-relaxed text-muted">
          {b}
        </p>
      );
    }
  });
  flush("l-end");
  return <div className="space-y-3">{out}</div>;
}
