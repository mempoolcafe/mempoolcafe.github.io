import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links to pages that were folded into others working. Temporary
  // (307) so browsers don't cache them forever if the pages come back.
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: false },
      { source: "/interests", destination: "/", permanent: false },
      { source: "/experience", destination: "/about#experience", permanent: false },
      { source: "/education", destination: "/about#education", permanent: false },
    ];
  },
};

export default nextConfig;
