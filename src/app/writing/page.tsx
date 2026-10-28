import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { WritingRoot } from "@/components/df/writing-root";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building AI products, and on the water. Tech and life.",
};

const count = (c: string) => (c === "all" ? posts.length : posts.filter((p) => p.category === c).length);
const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
const num = (i: number) => String(i + 1).padStart(2, "0");
const filters: [string, string][] = [["all", "All"], ["tech", "Tech"], ["life", "Life"]];

export default function WritingPage() {
  const previews = posts.map((p) => ({ cat: p.category, date: fmt(p.date), summary: p.summary }));
  return (
    <WritingRoot previews={previews}>
      <section className="phero w-hero">
        <div className="wrap">
          <p className="kicker accent scr">Writing</p>
          <h1 className="condensed kin w-h1">Notes on building, and on the water.</h1>
          <p className="lede">Short pieces, one idea each. Some about tech, some about life. Filter below.</p>
          <span className="w-ghost condensed" aria-hidden="true">{posts.length}</span>
        </div>
      </section>
      <section className="wlist-sec">
        <div className="wrap">
          <div className="w-bar">
            <div className="tabs" role="tablist" aria-label="Filter writing" id="wtabs">
              {filters.map(([k, l], i) => (
                <button key={k} role="tab" type="button" aria-selected={i === 0} data-f={k}>
                  {l}<span className="n">{count(k)}</span>
                </button>
              ))}
            </div>
            <p className="kicker w-idx">Index</p>
          </div>
          <div className="wlist" id="wlist">
            {posts.map((p, i) => (
              <Link key={p.slug} className="wrow" href={`/writing/${p.slug}`} data-cat={p.category}>
                <span className="wnum condensed" aria-hidden="true">{num(i)}</span>
                <div className="wmeta"><span>{fmt(p.date)}</span><span className="wcat">{p.category}</span></div>
                <div className="wmain">
                  <h2 className="wtitle condensed"><span className="wt">{p.title}</span><span className="warr" aria-hidden="true">→</span></h2>
                  <p className="wsum">{p.summary}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <i className="wline" aria-hidden="true"></i>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <aside className="wprev" id="wprev" aria-hidden="true"><span className="kicker accent" id="wpc"></span><p id="wps"></p></aside>
    </WritingRoot>
  );
}
