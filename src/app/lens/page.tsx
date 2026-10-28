import type { Metadata } from "next";
import Link from "next/link";
import { LensReels } from "@/components/df/lens-reels";
import { LensFilm } from "@/components/df/lens-film";
import { LensPhotos } from "@/components/df/lens-photos";
import { lensIntro, reels, film, photos, selectedPhotos, categories, places } from "@/lib/lens";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lens",
  description: "Photography and fast-cut vertical reels by JP: underwater, adventure, wildlife and travel. Available for brand and product shoots.",
  openGraph: { images: ["/lens/photos/elephant-herd.jpg"] },
};

export default function LensPage() {
  return (
    <div className="p-lens">
      <header className="ln-hero">
        <div className="wrap">
          <div className="ln-top">
            <div className="ln-titles">
              <p className="kicker accent scr">Photo &amp; film</p>
              <h1 className="condensed kin ln-h1" id="lnH">Lens</h1>
              <p className="lede">{lensIntro}</p>
            </div>
            <dl className="ln-stats">
              <div><dt className="kicker">Reels</dt><dd className="condensed" data-count={reels.length}>{reels.length}</dd></div>
              <div><dt className="kicker">Frames</dt><dd className="condensed" data-count={photos.length}>{photos.length}</dd></div>
              <div><dt className="kicker">Places</dt><dd className="condensed" data-count={places.length}>{places.length}</dd></div>
            </dl>
          </div>
          <LensReels reels={reels} />
        </div>
      </header>

      <section className="section ln-film" id="film">
        <div className="wrap">
          <div className="sh">
            <p className="kicker accent scr">Long form</p>
            <h2 className="display-xl condensed kin">One trip, one track.</h2>
          </div>
          <LensFilm film={film} />
        </div>
      </section>

      <LensPhotos selected={selectedPhotos} photos={photos} categories={categories} />

      <section className="section ln-cta">
        <div className="wrap">
          <h2 className="condensed kin ln-cth">Have a product, a place or a trip that needs a reel?</h2>
          <p className="lede up">Tell me what it is and when. I&apos;ll reply with an idea and a rough cut plan.</p>
          <div className="btns up">
            <Link className="btn btn-primary" href="/contact">Start a project <span className="arr">→</span></Link>
            <span className="ln-mail">{site.email}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
