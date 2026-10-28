// ============================================================================
// blog.ts — loads posts from content/blog/*.md at build time.
// Each file needs frontmatter with `title`, `date` (YYYY-MM-DD) and `summary`,
// plus an optional `topic` (one of the topics in portfolio-data.ts).
// The filename (minus .md) becomes the URL slug: /blog/<slug>.
// Server-only — it reads the filesystem.
// ============================================================================

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { portfolioData } from "@/lib/portfolio-data";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  /** ISO date string, YYYY-MM-DD. */
  date: string;
  summary: string;
  /** Topic slug (e.g. "tech"), or "" when untagged. */
  topic: string;
}

export interface Post extends PostMeta {
  html: string;
}

export interface TopicInfo {
  slug: string;
  label: string;
  note?: string;
  /** Number of posts tagged with this topic. */
  count: number;
}

/** "Brazilian Jiu-Jitsu" -> "brazilian-jiu-jitsu" */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// gray-matter turns an unquoted YAML date into a Date object; normalize both
// forms to YYYY-MM-DD so sorting and display behave the same.
function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

function readPost(slug: string): { meta: PostMeta; content: string } {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: toIsoDate(data.date),
      summary: String(data.summary ?? ""),
      topic: data.topic ? slugify(String(data.topic)) : "",
    },
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => readPost(name.replace(/\.md$/, "")).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  if (!getAllPosts().some((post) => post.slug === slug)) {
    return null;
  }
  const { meta, content } = readPost(slug);
  return { ...meta, html: marked.parse(content, { async: false }) };
}

/** Topics from portfolio-data.ts with post counts, in the order listed there. */
export function getTopics(posts: PostMeta[] = getAllPosts()): TopicInfo[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.topic) {
      counts.set(post.topic, (counts.get(post.topic) ?? 0) + 1);
    }
  }

  const topics: TopicInfo[] = portfolioData.topics.map((topic) => {
    const slug = slugify(topic.label);
    return { ...topic, slug, count: counts.get(slug) ?? 0 };
  });

  // A post tagged with a topic that isn't listed still gets a filter entry.
  for (const [slug, count] of counts) {
    if (!topics.some((topic) => topic.slug === slug)) {
      topics.push({ slug, label: slug.replace(/-/g, " "), count });
    }
  }
  return topics;
}
