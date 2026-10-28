import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { caseStudies, caseworkUrl } from "@/lib/casework";
import { Section, SectionHeader, Eyebrow, Tag } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { PedestalFeature } from "@/components/pedestal-feature";
import { ProjectFilter, FilterGroup } from "@/components/project-filter";
import { groupTypes, itemTypes, pitchscore, projectTypes, typesOf, type ProjectType } from "@/lib/project-types";
import { uniLead, uniSide, getUni } from "@/lib/uni";
import { UniCard } from "@/components/uni-card";
import { FeaturedGrid } from "@/components/featured-grid";
import { ShowAll } from "@/components/show-all";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pedestal, my AI communication coach; SmartCare, gitit and other university and personal builds; five playable AI PM case studies; four hosted AI products; and 45 from-scratch NLP/LLM notebooks.",
};

// How many pieces of work each tab shows. Grouped work counts once per item;
// uni projects and side builds are typed card by card.
const SIDE = ["pitchscore-ai", ...uniSide];
const tally: [readonly ProjectType[], number][] = [
  [groupTypes.pedestal, 1],
  ...[...uniLead, ...SIDE].map((slug): [ProjectType[], number] => [itemTypes[slug], 1]),
  [groupTypes.casework, caseStudies.length],
  [groupTypes.products, projects.length],
  [groupTypes.lab, 1],
];
const counts = {
  all: tally.reduce((n, [, k]) => n + k, 0),
  ...Object.fromEntries(
    projectTypes.map((t) => [t.id, tally.filter(([types]) => types.includes(t.id)).reduce((n, [, k]) => n + k, 0)]),
  ),
} as Record<"all" | ProjectType, number>;

export default function ProjectsPage() {
  return (
    <>
      <Section className="!pb-12">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Three I'd show you first."
            intro="A venture I'm building, my capstone, and a product I shipped on my own. All real, all measured. Everything else is one click away."
          />
        </Reveal>
        <div className="mt-10">
          <FeaturedGrid />
        </div>
      </Section>

      <ShowAll total={counts.all}>
        <ProjectFilter counts={counts}>
          <div className="[&>section+section]:border-t [&>section+section]:border-line">
            <FilterGroup types={groupTypes.pedestal}>
              <Section id="pedestal" className="scroll-mt-32">
                <Reveal>
                  <SectionHeader
                    eyebrow="My venture"
                    title="Pedestal, the thing I'm building."
                    intro="An AI communication coach for the rooms that decide careers. I build the product end to end: the mobile app, the backend, the coach, and the pitch."
                  />
                </Reveal>
                <Reveal delay={80}>
                  <div className="mt-10">
                    <PedestalFeature />
                  </div>
                </Reveal>
              </Section>
            </FilterGroup>

            <FilterGroup types={typesOf(uniLead)}>
              <Section id="built" className="scroll-mt-32">
                <Reveal>
                  <SectionHeader
                    eyebrow="University & personal"
                    title="Built with a team, evaluated honestly."
                    intro="Projects from my Master's at UNSW, and a product I built for myself. Real data, real results, limits stated. Numbers come from the reports. Where a result was negative, it says so."
                  />
                </Reveal>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {uniLead.map((slug, i) => (
                    <FilterGroup key={slug} types={itemTypes[slug]}>
                      <Reveal delay={(i % 2) * 90}>
                        <UniCard u={getUni(slug)} />
                      </Reveal>
                    </FilterGroup>
                  ))}
                </div>
              </Section>
            </FilterGroup>

            <FilterGroup types={groupTypes.casework}>
              <Section id="casework" className="scroll-mt-32">
                <Reveal>
                  <SectionHeader
                    eyebrow="Casework"
                    title="Case studies you play, not read."
                    intro="Five core AI PM skills: PRDs, evals, launch plans, risk and safety, and metrics. Each grounded in a real product from a company you know, and turned into a decision you actually make. Unofficial concept work, everything in mock mode."
                  />
                </Reveal>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {caseStudies.map((c, i) => (
                    <Reveal key={c.slug} delay={(i % 2) * 90}>
                      <a
                        href={`${caseworkUrl}/${c.slug}`}
                        className={`glass hairline lift group block h-full overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
                      >
                        {c.shot ? (
                          <div
                            className={`relative w-full overflow-hidden border-b border-line ${i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"}`}
                          >
                            <Image
                              src={c.shot}
                              alt={`${c.title} case study screen`}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                        ) : null}
                        <div className="p-6 sm:p-7">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                            <span className="uppercase tracking-[0.18em] text-accent">{c.skill}</span>
                            <span className="text-muted">·</span>
                            <span className="text-muted">{c.company}</span>
                            <span className="ml-auto text-muted">~{c.minutes} min</span>
                          </div>
                          <h2 className="font-display mt-3 text-2xl font-medium tracking-tight">{c.title}</h2>
                          <p className="mt-2 text-muted">{c.hook}</p>
                          <p className="mt-3 text-sm leading-relaxed text-muted">{c.twist}</p>
                          <span className="link-underline mt-5 inline-block text-sm font-medium text-link">
                            Play it →
                          </span>
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </Section>
            </FilterGroup>

            <FilterGroup types={groupTypes.products}>
              <Section id="products" className="scroll-mt-32">
                <Reveal>
                  <SectionHeader
                    title="Four AI products, two lenses each."
                    intro="Evaluation, RAG, multimodal, and safe agents. Each one is a working demo, then reads two ways: an engineering case study for how it's built, and a product case study for why. Every demo runs in mock mode, so it works with no API keys."
                  />
                </Reveal>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {projects.map((p, i) => (
                    <Reveal key={p.slug} delay={(i % 2) * 90}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              </Section>
            </FilterGroup>

            {/* Side builds */}
            <FilterGroup types={typesOf(SIDE)}>
              <Section id="builds" className="scroll-mt-32">
                <Reveal>
                  <SectionHeader
                    eyebrow="Side builds"
                    title="Smaller things, shipped for fun."
                    intro="Built for myself: a pitch coach, and a music tool because I swim."
                  />
                </Reveal>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  <FilterGroup types={itemTypes["pitchscore-ai"]}>
                    <Reveal>
                      <a
                        href={pitchscore.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="surface lift group flex h-full flex-col p-7"
                      >
                        <span className="kicker kicker-accent">Voice AI · web app</span>
                        <h3 className="font-display display-lg mt-4 transition-colors group-hover:text-link">
                          {pitchscore.title}
                        </h3>
                        <p className="mt-3 flex-1 leading-relaxed text-muted">{pitchscore.pitch}</p>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {pitchscore.stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                        <span className="link-underline mt-6 self-start text-sm font-medium text-link">
                          View on GitHub ↗
                        </span>
                      </a>
                    </Reveal>
                  </FilterGroup>
                  {uniSide.map((slug, i) => (
                    <FilterGroup key={slug} types={itemTypes[slug]}>
                      <Reveal delay={(i + 1) * 90}>
                        <UniCard u={getUni(slug)} />
                      </Reveal>
                    </FilterGroup>
                  ))}
                </div>
              </Section>
            </FilterGroup>

            {/* Lab teaser */}
            <FilterGroup types={groupTypes.lab}>
              <Section id="lab">
                <Reveal>
                  <Link href="/projects/lab" className="glass hairline lift group block overflow-hidden p-8 sm:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="max-w-2xl">
                        <Eyebrow>Lab · from scratch</Eyebrow>
                        <h2 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                          And underneath the products: the stack, built by hand.
                        </h2>
                        <p className="mt-3 leading-relaxed text-muted">
                          Products show I can ship. The Lab shows I know what&apos;s underneath: 45 notebooks
                          implementing the modern NLP and LLM stack from first principles, a regex tokenizer to RLHF.
                        </p>
                      </div>
                      <span className="link-underline shrink-0 text-sm font-medium text-link">Open the Lab →</span>
                    </div>
                  </Link>
                </Reveal>
              </Section>
            </FilterGroup>
          </div>
        </ProjectFilter>
      </ShowAll>
    </>
  );
}
