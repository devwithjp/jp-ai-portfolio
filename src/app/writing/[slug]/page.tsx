import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { Section, Prose } from "@/components/ui";
import { Reveal } from "@/components/reveal";

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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <Link href="/writing" className="text-sm text-muted hover:text-fg">
          ← All writing
        </Link>
        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
              {post.category}
            </span>
            <span className="font-mono text-xs text-muted">{post.date}</span>
            {post.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] text-muted/70">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{post.summary}</p>
        </Reveal>
        <div className="wave-rule my-8" />
        <Reveal delay={80}>
          <div className="text-lg">
            <Prose blocks={post.body} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
