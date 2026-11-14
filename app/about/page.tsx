import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "About Me",
};

// About Me moved to the landing page. On Vercel, next.config.ts redirects
// /about to / before this page is reached. The GitHub Pages export can't
// redirect, so this page forwards old links with a meta refresh instead
// (React hoists the <meta> into <head>).
export default function AboutMoved() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${withBasePath("/")}`} />
      <PageHeader title="About Me" />
      <p>
        this page moved to the <Link href="/">home page</Link>.
      </p>
    </>
  );
}
