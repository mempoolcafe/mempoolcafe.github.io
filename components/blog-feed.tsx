"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PostMeta, TopicInfo } from "@/lib/blog";
import BlogFeedView from "@/components/blog-feed-view";

// The selected topic lives in the URL (?topic=golf) so filtered views can be
// linked to, and so topic links elsewhere on the site land pre-filtered.
export default function BlogFeed({
  posts,
  topics,
}: {
  posts: PostMeta[];
  topics: TopicInfo[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const topic = useSearchParams().get("topic") ?? "";

  const setTopic = (next: string) => {
    const url = next ? `${pathname}?topic=${encodeURIComponent(next)}` : pathname;
    router.replace(url, { scroll: false });
  };

  return (
    <BlogFeedView
      posts={posts}
      topics={topics}
      topic={topic}
      onTopicChange={setTopic}
    />
  );
}
