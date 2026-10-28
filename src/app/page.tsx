import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { waterQuote } from "@/lib/story";
import { featured } from "@/lib/featured";
import { education, reforge } from "@/lib/resume";
import { Container, Section, CTA } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CourseList } from "@/components/course-list";

// Recruiter-critical facts, shown as a bare credential strip under the hero.
const FACTS = [
  { k: "Now", v: "AI PM, Enluma Health" },
  { k: "Before", v: "Engineer, 50M+ users" },
  { k: "Study", v: "MS in AI, UNSW, 2026" },
  { k: "Rights", v: "Full AU work rights, 485" },
];

const DEGREES = education.filter((e) => e.id !== "udacity");

const COURSES = [
  { title: reforge.name, note: `Full feature lifecycle · ${reforge.completed}`, href: "/resume#reforge" },
  { title: "Machine Learning, Andrew Ng", note: "Coursera", href: "/resume#certifications" },
  { title: "UX Design + Front-End Developer", note: "Udacity Nanodegrees · 2020", href: "/resume#udacity" },
  { title: "Leadership Foundations + Strategic Thinking", note: "UNSW · AGSM", href: "/resume#certifications" },
];

const ELSEWHERE = [
  { href: "/skills", label: "Skills", note: "Every skill, and where" },
  { href: "/about", label: "About", note: "How I got here" },
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

      {/* Work, in short: a gist per strand, each hands off to the full page */}
      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display display-xl max-w-2xl">The work, in short.</h2>
            <Link href="/projects" className="link-underline text-sm font-medium text-link">
              All projects →
            </Link>
          </div>
        </Reveal>
        <ul className="mt-10 border-t border-line">
          {featured.map((w, i) => (
            <Reveal key={w.title} as="li" delay={i * 60}>
              <Link
                href={w.href}
                {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-5 border-b border-line py-6 sm:gap-8"
              >
                <span className="self-start pt-2 font-mono text-xs text-muted/60">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <p className="kicker kicker-accent">{w.kicker}</p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {w.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted">{w.blurb}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted/70">{w.meta}</p>
                </div>
                <div className="relative hidden aspect-[16/10] w-48 flex-none overflow-hidden rounded-xl border border-line md:block">
                  <Image src={w.shot} alt="" fill sizes="192px" className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <span className="text-link transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Education */}
      <Section className="border-t border-line">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker kicker-accent">Education</span>
              <h2 className="font-display display-xl mt-4 max-w-2xl">Two degrees, and the courses between.</h2>
            </div>
            <Link href="/skills?view=learning" className="link-underline text-sm font-medium text-link">
              What each one taught me →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid content-start gap-5">
            {DEGREES.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <Link href={`/resume#${d.id}`} className="surface lift group block p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-link">{d.org}</p>
                    {d.period ? <span className="font-mono text-xs text-muted">{d.period}</span> : null}
                  </div>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {d.title}
                  </h3>
                  {d.points.map((p) => (
                    <p key={p} className="mt-2 leading-relaxed text-muted">{p}</p>
                  ))}
                  {d.courses ? <CourseList courses={d.courses} compact /> : null}
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <div className="surface h-full p-7">
              <p className="kicker">Courses + programs</p>
              <ul className="mt-4 divide-y divide-line">
                {COURSES.map((c) => (
                  <li key={c.title}>
                    <Link href={c.href} className="group block py-4">
                      <span className="font-medium transition-colors group-hover:text-link">{c.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{c.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
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
