import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import BlogFeed from "@/components/blog-feed";
import BlogFeedView from "@/components/blog-feed-view";
import { getAllPosts, getTopics } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();
  const topics = getTopics(posts);

  return (
    <>
      <PageHeader title="The Blog" color="blue" />
      <p className="mb-4">
        writeups, notes, and random thoughts on the things i&apos;m into. read,
        think, and feel free to <Link href="/contact">tell me</Link> what you
        think.
      </p>
      {/* BlogFeed reads ?topic= from the URL, which only exists in the
          browser; until then the full, unfiltered feed is shown. */}
      <Suspense
        fallback={<BlogFeedView posts={posts} topics={topics} topic="" />}
      >
        <BlogFeed posts={posts} topics={topics} />
      </Suspense>
    </>
  );
}
