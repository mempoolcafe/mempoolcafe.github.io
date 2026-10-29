"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { portfolioData } from "@/lib/portfolio-data";

// Shown in the top-left corner. Reword freely.
const siteTitle = "~ my website ~";
const siteSubtitle = "est. 2025";

const navLinks = [
  { label: "Blog", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

// The blog lives at "/", with individual posts under /blog/<slug>.
function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/blog");
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="pt-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-3">
        <Link href="/" className="text-ink no-underline hover:text-ink">
          <span className="block text-[15px] font-bold">{siteTitle}</span>
          <span className="block text-[10px] text-muted">{siteSubtitle}</span>
        </Link>
        <p className="text-[11px] font-bold">
          <Link href="/">blog</Link>
          {" | "}
          <Link href="/about">about me</Link>
          {" | "}
          <a
            href={withBasePath(portfolioData.resumeUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
        </p>
      </div>
      <nav className="flex flex-wrap gap-x-[3px] gap-y-1 border-b-4 border-[#4f9620]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(pathname, link.href) ? "page" : undefined}
            className="tab-glossy"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
