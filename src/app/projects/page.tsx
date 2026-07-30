import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { caseStudies, caseworkUrl } from "@/lib/casework";
import { Section, SectionHeader, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five playable AI PM case studies (Canva, Duolingo, Spotify, Airbnb, Netflix), four hosted AI products, and 45 from-scratch NLP/LLM notebooks.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section>
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
                  <div className={`relative w-full overflow-hidden border-b border-line ${i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
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

      <Section className="border-t border-line">
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

      {/* Lab teaser */}
      <Section className="border-t border-line">
        <Reveal>
          <Link href="/lab" className="glass hairline lift group block overflow-hidden p-8 sm:p-10">
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
    </>
  );
}
