/**
 * Prefixes a root-relative URL (e.g. "/Jeffrey_Wang_Resume.pdf") with the
 * site's base path. Needed for plain <a>, <object> and next/image src values
 * when the site is served from a sub-path like jeffw3558.github.io/portfolio.
 * <Link> handles this on its own. Empty (a no-op) on Vercel.
 */
export function withBasePath(path: string): string {
  return path.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
    : path;
}
