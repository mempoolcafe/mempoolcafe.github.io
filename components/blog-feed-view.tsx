import Link from "next/link";
import type { PostMeta, TopicInfo } from "@/lib/blog";
import { formatPostDate, formatPostMonth } from "@/lib/format-date";
import NewBadge from "@/components/new-badge";

interface BlogFeedViewProps {
  /** All posts, newest first. */
  posts: PostMeta[];
  topics: TopicInfo[];
  /** Selected topic slug, or "" for all topics. */
  topic: string;
  /** Omitted for the static pre-render, which shows the dropdown disabled. */
  onTopicChange?: (topic: string) => void;
}

// Presentational feed shared by the server pre-render and the client
// <BlogFeed>, so no hooks here.
export default function BlogFeedView({
  posts,
  topics,
  topic,
  onTopicChange,
}: BlogFeedViewProps) {
  const selected = topics.find((t) => t.slug === topic);
  const visible = selected
    ? posts.filter((post) => post.topic === selected.slug)
    : posts;
  const topicBySlug = new Map(topics.map((t) => [t.slug, t]));

  // Posts are already newest first, so grouping runs of the same month works.
  const months: { month: string; posts: PostMeta[] }[] = [];
  for (const post of visible) {
    const month = formatPostMonth(post.date);
    const last = months[months.length - 1];
    if (last?.month === month) {
      last.posts.push(post);
    } else {
      months.push({ month, posts: [post] });
    }
  }

  const selectValue = selected?.slug ?? "";

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2 border border-rule bg-[#f4f4f0] px-3 py-2">
        <label htmlFor="topic-filter" className="font-bold">
          Filter by topic:
        </label>
        <select
          id="topic-filter"
          className="input-classic w-auto"
          {...(onTopicChange
            ? {
                value: selectValue,
                onChange: (e) => onTopicChange(e.target.value),
              }
            : { defaultValue: selectValue, disabled: true })}
        >
          <option value="">all topics ({posts.length})</option>
          {topics.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label} ({t.count})
            </option>
          ))}
        </select>
      </div>

      {selected?.note && (
        <div className="box mb-4 bg-[#f6f9fb]">
          <h2 className="caption text-[14px]">{selected.label}</h2>
          <p className="text-muted">{selected.note}</p>
        </div>
      )}

      {months.length === 0 ? (
        <p className="box text-muted">
          {selected
            ? `nothing written about ${selected.label} yet... stay tuned!`
            : "no posts yet... check back soon!"}
        </p>
      ) : (
        months.map((group) => (
          <section key={group.month} className="mb-6">
            <h2 className="mb-3 border-b border-dashed border-rule pb-1 text-[11px] font-bold uppercase tracking-wider text-muted">
              {group.month}
            </h2>
            <ul className="space-y-5">
              {group.posts.map((post) => {
                const postTopic = topicBySlug.get(post.topic);
                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[16px] font-bold"
                    >
                      {post.title}
                    </Link>
                    <NewBadge date={post.date} />
                    <p className="text-[11px] text-muted">
                      {formatPostDate(post.date)}
                      {postTopic && (
                        <>
                          {" "}
                          &middot; filed under{" "}
                          <Link href={`/?topic=${postTopic.slug}`}>
                            {postTopic.label}
                          </Link>
                        </>
                      )}
                    </p>
                    {post.summary && <p className="mt-1">{post.summary}</p>}
                    <p className="mt-1 text-[12px] font-bold">
                      <Link href={`/blog/${post.slug}`}>read more &gt;&gt;</Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
