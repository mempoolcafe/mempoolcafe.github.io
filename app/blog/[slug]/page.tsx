import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import { getAllPosts, getPost, getTopics } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";

// Every post is generated at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  // Posts are sorted newest first, so the next index is the older post.
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const topic = getTopics(posts).find((t) => t.slug === post.topic);

  return (
    <article>
      <PageHeader title={post.title} color="blue" />
      <p className="mb-4 text-[11px] text-muted">
        posted {formatPostDate(post.date)}
        {topic && (
          <>
            {" "}
            &middot; filed under{" "}
            <Link href={`/?topic=${topic.slug}`}>{topic.label}</Link>
          </>
        )}
      </p>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <nav className="mt-8 flex flex-wrap justify-between gap-2 border-t border-dashed border-rule pt-3 text-[12px] font-bold">
        <span>
          {older ? (
            <Link href={`/blog/${older.slug}`}>&laquo; {older.title}</Link>
          ) : (
            <span className="text-muted">&laquo; oldest post</span>
          )}
        </span>
        <Link href="/">all posts</Link>
        <span>
          {newer ? (
            <Link href={`/blog/${newer.slug}`}>{newer.title} &raquo;</Link>
          ) : (
            <span className="text-muted">newest post &raquo;</span>
          )}
        </span>
      </nav>
    </article>
  );
}
