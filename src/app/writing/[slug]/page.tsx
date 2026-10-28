import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { PostRoot } from "@/components/df/post-root";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.summary };
}

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

type Block = { ul: true; items: string[] } | { ul: false; text: string };

function PostNav({ q, dir }: { q?: { slug: string; title: string }; dir: "prev" | "next" }) {
  if (!q) return <span className="pn pn-empty"></span>;
  return (
    <Link className={`pn pn-${dir}`} href={`/writing/${q.slug}`}>
      <span className="kicker">{dir === "prev" ? "← Previous" : "Next →"}</span>
      <span className="pn-t condensed">{q.title}</span>
    </Link>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[idx - 1], next = posts[idx + 1];

  // Group consecutive "- " lines into one list.
  const blocks: Block[] = [];
  post.body.forEach((s) => {
    if (s.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last && last.ul) last.items.push(s.slice(2));
      else blocks.push({ ul: true, items: [s.slice(2)] });
    } else blocks.push({ ul: false, text: s });
  });
  let firstDone = false;

  return (
    <PostRoot>
      <article className="post" id="article">
        <header className="post-hero">
          <span className="post-ghost condensed" aria-hidden="true">{post.category}</span>
          <div className="wrap">
            <div className="post-head">
              <Link href="/writing" className="link back">← All writing</Link>
              <div className="post-meta"><span className="pill">{post.category}</span><span className="kicker">{fmt(post.date)}</span></div>
              <h1 className="condensed kin post-h1">{post.title}</h1>
              <p className="lede">{post.summary}</p>
              <div className="tags">
                {post.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <hr className="post-rule draw" />
            </div>
          </div>
        </header>
        <div className="wrap">
          <div className="prose" id="prose">
            {blocks.map((b, i) => {
              if (b.ul)
                return (
                  <ul className="dotlist" key={i}>
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              const pull = !firstDone;
              firstDone = true;
              return <p key={i} className={pull ? "pull" : undefined}>{b.text}</p>;
            })}
          </div>
          <nav className="post-nav" aria-label="More writing">
            <PostNav q={prev} dir="prev" />
            <PostNav q={next} dir="next" />
          </nav>
        </div>
      </article>
      <div className="ring" id="ring" aria-hidden="true">
        <svg viewBox="0 0 44 44"><circle className="rg-bg" cx="22" cy="22" r="18" /><circle className="rg-fg" id="rgfg" cx="22" cy="22" r="18" /></svg>
        <span id="rgtxt">0</span>
      </div>
    </PostRoot>
  );
}
