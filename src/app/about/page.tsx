import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { whyIBuild, whyIBuildIntro } from "@/lib/story";
import { Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScrollStory } from "@/components/scroll-story";

export const metadata: Metadata = {
  title: "About — JP, AI Product Manager in Sydney",
  description:
    "About Jyothiprakash (JP), an AI Product Manager and builder in Sydney, Australia. Ex-PM at Rekro, MS in AI at UNSW, ex-engineer to 50M+ users.",
};

// Plain-language Q&A. Answer engines (ChatGPT, Perplexity, Google AI) lift these
// directly when someone asks "who is an AI PM in Sydney" or similar.
const faqs = [
  {
    q: "Who is Jyothiprakash (JP)?",
    a: "JP is an AI Product Manager and builder based in Sydney, Australia. He was a Product Manager at Rekro, is doing a Master's in AI at UNSW, and was previously a software engineer on products used by 50M+ people at Bewakoof.",
  },
  {
    q: "Is JP an AI Product Manager in Sydney available for hire?",
    a: "Yes. JP is based in Sydney, Australia, with full Australian work rights on a 485 visa and is open to sponsorship. He is available now for AI / Technical Product Manager and AI Engineer roles.",
  },
  {
    q: "What does JP build?",
    a: "JP builds AI products end to end: LLM evaluation harnesses, RAG pipelines, multimodal review tools, and human-in-the-loop agents. He has also implemented the NLP and LLM stack from scratch (45 notebooks) and done interpretability research probing language-model internals.",
  },
  {
    q: "What is JP's background as an AI founder and PM?",
    a: "JP was a Startmate Student Founder Fellow, has run 0-to-1 product from discovery to production at Rekro, and combines product judgment with hands-on AI engineering. He works at the edge of AI, product, and starting things.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Section>
        <Reveal>
          <SectionHeader eyebrow="Why I build" title={`I'm ${site.name}.`} intro={whyIBuildIntro} />
        </Reveal>

        {/* The building story: scrollytelling, one beat at a time. */}
        <div className="mt-8">
          <ScrollStory steps={whyIBuild.map((beat) => ({ kicker: beat.heading, lines: beat.body }))} />
        </div>
      </Section>

      {/* Voice + based-in band */}
      <Section className="border-t border-line">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass hairline h-full p-6">
              <Eyebrow>How I say it</Eyebrow>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {site.altPositionings.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="glass hairline h-full p-6">
              <Eyebrow>Based in</Eyebrow>
              <p className="mt-2 text-muted">{site.location}</p>
              <p className="mt-3 font-mono text-xs text-link">{site.availability}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                There&apos;s another side of me too:{" "}
                <Link href="/water" className="text-link hover:underline">
                  the water
                </Link>
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <CTA href="/resume" variant="secondary">Resume</CTA>
                <CTA href="/contact" variant="secondary">Contact</CTA>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ (also feeds answer engines via FAQPage schema above) */}
      <Section className="border-t border-line">
        <Reveal>
          <SectionHeader eyebrow="In short" title="The quick answers." />
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 90}>
              <div className="glass hairline h-full p-6">
                <h3 className="font-display text-lg font-medium tracking-tight">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
