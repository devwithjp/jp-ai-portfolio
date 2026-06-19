import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import { Section, SectionHeader } from "@/components/ui";
import { WritingList } from "@/components/writing-list";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building AI products, and on the water. Tech and life.",
};

export default function WritingPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="Writing"
          title="Notes on building, and on the water."
          intro="Short pieces, one idea each. Some about tech, some about life. Filter below."
        />
      </Reveal>
      <div className="mt-10">
        <WritingList posts={posts} />
      </div>
    </Section>
  );
}
