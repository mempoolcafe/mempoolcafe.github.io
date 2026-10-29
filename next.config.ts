import type { NextConfig } from "next";

// The same code deploys twice:
// - Vercel: a normal Next.js build (redirects + image optimization).
// - GitHub Pages: a static export into out/, built by
//   .github/workflows/pages.yml with GITHUB_PAGES=true. Pages serves the repo
//   under a sub-path (e.g. /portfolio), passed in as PAGES_BASE_PATH.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  basePath,
  env: {
    // Read by withBasePath() for plain <a>/<object>/<img> URLs, which
    // (unlike <Link>) don't get the base path added automatically.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages
    ? {
        output: "export",
        // Pages serves /about/index.html for /about/ reliably.
        trailingSlash: true,
        // There's no server to resize images on Pages.
        images: { unoptimized: true },
      }
    : {
        // Keep links to pages that were folded into others working. Temporary
        // (307) so browsers don't cache them forever if the pages come back.
        // Static exports can't redirect, so these are Vercel-only.
        async redirects() {
          return [
            { source: "/blog", destination: "/", permanent: false },
            { source: "/interests", destination: "/", permanent: false },
            { source: "/experience", destination: "/about#experience", permanent: false },
            { source: "/education", destination: "/about#education", permanent: false },
          ];
        },
      }),
};

export default nextConfig;
