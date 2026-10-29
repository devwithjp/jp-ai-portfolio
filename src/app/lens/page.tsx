import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ReelRail, FilmFeature } from "@/components/lens/reel-player";
import { SelectedGrid, ArchiveStrip } from "@/components/lens/photo-gallery";
import { lensIntro, reels, film, photos, selectedPhotos, archivePhotos, categories } from "@/lib/lens";

export const metadata: Metadata = {
  title: "Lens",
  description: "Photography and fast-cut vertical reels by JP: underwater, adventure, wildlife and travel. Available for brand and product shoots.",
  openGraph: { images: ["/lens/photos/dudhsagar-tunnel.jpg"] },
};

export default function LensPage() {
  return (
    <>
      {/* Hero: the reels lead, like a showreel */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%), radial-gradient(50% 40% at 0% 100%, color-mix(in oklab, var(--accent-2) 12%, transparent), transparent 70%)",
          }}
        />
        <Container className="relative pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Photo & film</span>
              <h1 className="font-display mt-4 text-[22vw] font-medium leading-[0.85] tracking-tight text-fg sm:text-[11rem]">Lens</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{lensIntro}</p>
            </Reveal>
            <Reveal delay={120} className="lg:pb-3">
              <dl className="grid grid-cols-2 gap-6 font-mono text-xs uppercase tracking-[0.16em] text-muted lg:grid-cols-1 lg:gap-4 lg:text-right">
                <div>
                  <dt className="opacity-70">Reels</dt>
                  <dd className="font-display mt-1 text-3xl normal-case tracking-tight text-fg">{reels.length}</dd>
                </div>
                <div>
                  <dt className="opacity-70">Frames</dt>
                  <dd className="font-display mt-1 text-3xl normal-case tracking-tight text-fg">{photos.length}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <div className="mt-14 sm:mt-16">
            <ReelRail reels={reels} />
          </div>
        </Container>
      </header>


      <Section id="film">
        <Reveal>
          <SectionHeader eyebrow="Long form" title="One trip, one track." />
        </Reveal>
        <Reveal className="mt-10">
          <FilmFeature film={film} />
        </Reveal>
      </Section>

      <Section id="work" className="border-t border-line">
        <Reveal>
          <SectionHeader eyebrow="Selected work" title="Frames I keep coming back to." />
        </Reveal>
        <div className="mt-12">
          <SelectedGrid photos={selectedPhotos} />
        </div>
      </Section>

      <Section id="archive" className="border-t border-line">
        <Reveal>
          <SectionHeader eyebrow="Archive" title="Everything else worth keeping." />
        </Reveal>
        <div className="mt-10">
          <ArchiveStrip photos={archivePhotos} categories={categories} />
        </div>
      </Section>


    </>
  );
}
