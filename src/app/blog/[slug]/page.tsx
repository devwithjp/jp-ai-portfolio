import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { Section, Prose } from "@/components/ui";

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
  if (!post) return { title: "Note not found" };
  return { title: post.title, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm text-muted hover:text-fg">
          ← All notes
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted">{post.date}</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{post.summary}</p>
        <hr className="my-8 border-line" />
        <div className="text-lg">
          <Prose blocks={post.body} />
        </div>
      </div>
    </Section>
  );
}
