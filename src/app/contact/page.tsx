import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role}.`,
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Contact"
        title="Let's talk"
        intro="Open to AI / Technical Product Manager and AI Engineer / Applied AI roles. The fastest way to reach me is email."
      />
      <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-2 font-mono text-xs text-link">
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
        {site.availability}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <a
          href={site.links.email}
          className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
        >
          <Eyebrow>Email</Eyebrow>
          <p className="mt-2 break-all text-fg">{site.email}</p>
        </a>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
        >
          <Eyebrow>LinkedIn</Eyebrow>
          <p className="mt-2 text-fg">Connect →</p>
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
        >
          <Eyebrow>GitHub</Eyebrow>
          <p className="mt-2 text-fg">View code →</p>
        </a>
      </div>

      <div className="mt-8">
        <CTA href={site.links.email}>Email me</CTA>
      </div>
    </Section>
  );
}
