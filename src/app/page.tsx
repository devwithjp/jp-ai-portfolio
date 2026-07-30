import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { whyIBuild, waterQuote } from "@/lib/story";
import { posts } from "@/lib/blog";
import { Container, Section, CTA } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { CaseworkStack } from "@/components/casework-stack";

// Recruiter-critical facts, shown in the hero meta panel.
const META = [
  { k: "Now", v: "Product Manager, 0 to 1 AI products" },
  { k: "Was", v: "Engineer to 50M+ users at Bewakoof" },
  { k: "Study", v: "MS in Artificial Intelligence, UNSW" },
  { k: "Rights", v: "Full AU work rights, 485 visa" },
];

export default function Home() {
  return (
    <>
      {/* Hero: asymmetric editorial split */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="kicker">
                <span className="kicker-accent">AI Product Manager</span>
                <span className="mx-2 text-muted/50">/</span>
                Sydney, Australia
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display display-hero mt-7">
                <span className="block">I started with code.</span>
                <span className="block">
                  I stayed for <span className="text-accent-word">building</span>.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                An engineer&apos;s hands, a product manager&apos;s judgment. I build AI products end to end,
                and care as much whether a thing is worth building as whether it works.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CTA href="/projects">See the work</CTA>
                <CTA href="/water" variant="secondary">
                  The water chapter
                </CTA>
              </div>
            </Reveal>
          </div>

          {/* Meta panel */}
          <Reveal delay={220} className="lg:pt-16">
            <div className="surface p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="kicker kicker-accent">Available now</span>
              </div>
              <dl className="mt-5 divide-y divide-line">
                {META.map((m) => (
                  <div key={m.k} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                    <dt className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-muted/70">
                      {m.k}
                    </dt>
                    <dd className="text-sm leading-snug text-fg">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Casework: the flagship */}
      <Section>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="tick" aria-hidden />
            <span className="kicker kicker-accent">Casework</span>
          </div>
          <h2 className="font-display display-xl mt-4 max-w-3xl">
            Five case studies you can play, not read.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            One core AI PM skill each, grounded in a real product from Canva, Duolingo, Spotify,
            Airbnb, and Netflix. Every one is a decision you make, not a document you skim.
          </p>
        </Reveal>
        <div className="mt-14">
          <CaseworkStack />
        </div>
      </Section>

      {/* Four products */}
      <Section className="border-t border-line">
        <Reveal>
          <h2 className="font-display display-xl max-w-3xl">Four AI products, built end to end.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Working demos with an engineering case study and a product case study each. Every demo
            runs in mock mode, no API keys needed.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why I build: editorial two-column, sticky title + stacked beats */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="kicker kicker-accent">Why I build</span>
              <h2 className="font-display display-xl mt-4">Engineering was the door, not the room.</h2>
              <p className="mt-5 text-muted">
                I like deciding what is worth making, then making it. Here is how that took shape.
              </p>
              <Link href="/about" className="link-underline mt-6 inline-block text-sm font-medium text-link">
                Read the whole story →
              </Link>
            </div>
          </Reveal>
          <div className="divide-y divide-line">
            {whyIBuild.map((beat, i) => (
              <Reveal key={beat.heading} delay={i * 80}>
                <div className="py-6 first:pt-0">
                  <h3 className="font-display text-xl font-semibold">{beat.heading}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{beat.body[0]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Water: split image + quote */}
      <section className="border-t border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/water/reef.jpg"
              alt="Freediving over a reef"
              className="kenburns absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/30" />
          </div>
          <Reveal className="flex items-center">
            <Container className="py-14 sm:py-20 lg:pl-14">
              <span className="kicker kicker-accent">Water</span>
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

      {/* Writing: hairline list */}
      <Section className="border-t border-line">
        <Reveal>
          <h2 className="font-display display-lg">Notes on building, and on the water.</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link href={`/writing/${p.slug}`} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-accent">
                  {p.category}
                </span>
                <span className="flex-1">
                  <span className="font-display text-lg font-medium transition-colors group-hover:text-link">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{p.summary}</span>
                </span>
                <span className="hidden text-link transition-transform group-hover:translate-x-1 sm:block">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <Link href="/writing" className="link-underline mt-8 inline-block text-sm font-medium text-link">
            All writing →
          </Link>
        </Reveal>
      </Section>

      {/* Contact */}
      <Section className="border-t border-line">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line p-10 text-center sm:p-16">
            <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
            <h2 className="font-display display-xl relative mx-auto max-w-2xl">
              Building something? Let&apos;s talk.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-muted">
              I&apos;m {site.shortName}, open to AI product and engineering roles, and to people building
              things worth building.
            </p>
            <div className="relative mt-9 flex justify-center">
              <CTA href="/contact">Get in touch</CTA>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
