import type { Metadata } from "next";
import { LensReels } from "@/components/df/lens-reels";
import { LensFilm } from "@/components/df/lens-film";
import { LensPhotos } from "@/components/df/lens-photos";
import { lensIntro, reels, film, photos, selectedPhotos, archivePhotos, categories } from "@/lib/lens";

export const metadata: Metadata = {
  title: "Lens",
  description: "Photography and fast-cut vertical reels by JP: underwater, adventure, wildlife and travel. Available for brand and product shoots.",
  openGraph: { images: ["/lens/photos/dudhsagar-tunnel.jpg"] },
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

      <LensPhotos selected={selectedPhotos} photos={archivePhotos} categories={categories} />

    </div>
  );
}
