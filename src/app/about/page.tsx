import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning,
};

export default function AboutPage() {
  return (
    <Section>
      <SectionHeader eyebrow="About" title={`I'm ${site.name} — an ${site.role}.`} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(0,300px)]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I sit in the overlap between AI engineering and product management: I can scope an
            ambiguous AI opportunity into a real product, build it end-to-end, evaluate whether
            it actually works, and explain the trade-offs to both engineers and stakeholders.
          </p>
          <p>
            My portfolio is four hosted AI products — an evaluation workbench, a RAG product-
            intelligence workspace, a multimodal UX reviewer, and a safe agent demo. Each one
            pairs working engineering (RAG, agents, evals, multimodal, deployment, security)
            with the product artifacts that make it real: a PRD, a metric framework, a roadmap,
            and a clear-eyed account of what I&apos;d build next.
          </p>
          <p>
            I build every demo mock-first, so it runs with zero API keys and never breaks for
            the person clicking the link. That&apos;s a small thing that says a lot about how I
            think about shipping: reliability and reviewer experience first.
          </p>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-5">
            <Eyebrow>Other ways I frame it</Eyebrow>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {site.altPositionings.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <Eyebrow>Based in</Eyebrow>
            <p className="mt-2 text-muted">{site.location}</p>
            <div className="mt-4">
              <CTA href="/contact" variant="secondary">Get in touch</CTA>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
