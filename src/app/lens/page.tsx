import type { Metadata } from "next";
import { Container, Section, SectionHeader, CTA, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/chrome";
import { ReelRail, FilmFeature } from "@/components/lens/reel-player";
import { SelectedGrid, ArchiveStrip } from "@/components/lens/photo-gallery";
import { lensIntro, reels, film, photos, selectedPhotos, categories, places, services, gear } from "@/lib/lens";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lens",
  description: "Photography and fast-cut vertical reels by JP: underwater, adventure, wildlife and travel. Available for brand and product shoots.",
  openGraph: { images: ["/lens/photos/elephants-dawn.jpg"] },
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
              <dl className="grid grid-cols-3 gap-6 font-mono text-xs uppercase tracking-[0.16em] text-muted lg:grid-cols-1 lg:gap-4 lg:text-right">
                <div>
                  <dt className="opacity-70">Reels</dt>
                  <dd className="font-display mt-1 text-3xl normal-case tracking-tight text-fg">{reels.length}</dd>
                </div>
                <div>
                  <dt className="opacity-70">Frames</dt>
                  <dd className="font-display mt-1 text-3xl normal-case tracking-tight text-fg">{photos.length}</dd>
                </div>
                <div>
                  <dt className="opacity-70">Places</dt>
                  <dd className="font-display mt-1 text-3xl normal-case tracking-tight text-fg">{places.length}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <div className="mt-14 sm:mt-16">
            <ReelRail reels={reels} />
          </div>
        </Container>
      </header>

      <div className="border-b border-line py-5">
        <Marquee>
          {places.map((p) => (
            <span key={p} className="font-display whitespace-nowrap text-2xl tracking-tight text-muted sm:text-3xl">
              {p}
              <span className="ml-10 text-accent" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </Marquee>
      </div>

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
          <SectionHeader eyebrow="Selected work" title="Frames I keep coming back to." intro="Developed from the originals and graded as one set. Tap any frame to see it full size." />
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
          <ArchiveStrip photos={photos} categories={categories} />
        </div>
      </Section>

      <Section id="services" className="border-t border-line">
        <Reveal>
          <SectionHeader eyebrow="For brands" title="Short, fast, and made to stop the scroll." intro="I shoot and cut vertical content for products and places, especially anything near water." />
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="surface h-full p-6">
                <h3 className="font-display text-xl font-medium tracking-tight text-fg">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Eyebrow>Shoots on</Eyebrow>
          {gear.map((g) => (
            <span key={g} className="font-mono text-xs text-muted">
              {g}
            </span>
          ))}
        </Reveal>
      </Section>

      <section className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <h2 className="font-display display-xl max-w-3xl text-fg">Have a product, a place or a trip that needs a reel?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Tell me what it is and when. I&apos;ll reply with an idea and a rough cut plan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="/contact">Start a project</CTA>
              <CTA href={site.links.email} variant="secondary" external>
                {site.email}
              </CTA>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
