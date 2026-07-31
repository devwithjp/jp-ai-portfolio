import Link from "next/link";
import { site } from "@/lib/site";
import { waterQuote } from "@/lib/story";
import { Container, Section, CTA } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { WorkIndex } from "@/components/work-index";

// Recruiter-critical facts, shown as a bare credential strip under the hero.
const FACTS = [
  { k: "Now", v: "PM, 0 to 1 AI products" },
  { k: "Before", v: "Engineer, 50M+ users" },
  { k: "Study", v: "MS in AI, UNSW Sydney" },
  { k: "Rights", v: "Full AU work rights, 485" },
];

const ELSEWHERE = [
  { href: "/about", label: "About", note: "How I got here" },
  { href: "/lab", label: "Lab", note: "The stack, built by hand" },
  { href: "/writing", label: "Writing", note: "Notes on building" },
  { href: "/resume", label: "Resume", note: "The one-page version" },
];

export default function Home() {
  return (
    <>
      {/* Hero: editorial manifesto */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container className="pt-20 pb-14 sm:pt-28 sm:pb-16">
          <Reveal>
            <p className="kicker">
              <span className="kicker-accent">AI Product Manager</span>
              <span className="mx-2 text-muted/50">/</span>
              Sydney, Australia
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display display-hero mt-7 max-w-4xl">
              <span className="block">I started with code.</span>
              <span className="block">
                I stayed for <span className="text-accent-word">building</span>.
              </span>
            </h1>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <Reveal delay={170}>
              <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                An engineer&apos;s hands, a product manager&apos;s judgment. I build AI products end to
                end, and care whether they are worth building.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <CTA href="/projects">See the work</CTA>
                <CTA href="/water" variant="secondary">
                  The water chapter
                </CTA>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Credential strip: bare facts, no card */}
        <div className="border-t border-line">
          <Container className="grid grid-cols-2 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div
                key={f.k}
                className="border-line py-5 pr-4 sm:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">{f.k}</p>
                <p className="mt-1.5 text-sm text-fg">{f.v}</p>
              </div>
            ))}
          </Container>
        </div>
      </header>

      {/* Selected work: the centerpiece */}
      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display display-xl max-w-2xl">
              Selected work. Most of it you can run.
            </h2>
            <span className="hidden font-mono text-xs uppercase tracking-wider text-muted sm:block">
              Nine projects, mock mode, no keys
            </span>
          </div>
        </Reveal>
        <div className="mt-12">
          <WorkIndex />
        </div>
      </Section>

      {/* Water: full-bleed personal moment */}
      <section className="relative border-t border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/water/reef.jpg"
              alt="Freediving over a reef in the Andaman Islands"
              className="kenburns absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent lg:bg-gradient-to-r" />
          </div>
          <Reveal className="flex items-center">
            <Container className="py-16 sm:py-24 lg:pl-16">
              <span className="kicker kicker-accent">Away from the desk</span>
              <h2 className="font-display display-lg mt-4 max-w-md">
                Confidence comes before skill, not after.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                I dive, and I teach kids to swim in Sydney. The water taught me more about learning,
                patience, and trust than most things at work.
              </p>
              <blockquote className="font-display mt-8 max-w-md text-2xl font-medium leading-snug text-fg">
                &ldquo;{waterQuote}&rdquo;
              </blockquote>
              <Link href="/water" className="link-underline mt-8 inline-block text-sm font-medium text-link">
                Read the water chapter →
              </Link>
            </Container>
          </Reveal>
        </div>
      </section>

      {/* Close: statement + elsewhere + contact */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display display-xl max-w-xl">Building something? Let&apos;s talk.</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                I&apos;m {site.shortName}, open to AI product and engineering roles, and to people building
                things worth building.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <CTA href="/contact">Get in touch</CTA>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-link">
                  LinkedIn
                </a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-link">
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="divide-y divide-line border-t border-line">
              {ELSEWHERE.map((e) => (
                <Link key={e.href} href={e.href} className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-lg font-medium transition-colors group-hover:text-link">
                    {e.label}
                  </span>
                  <span className="text-right text-sm text-muted">{e.note}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
