import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";

const footerLinks = [
  { label: "BLOG", href: "/" },
  { label: "ABOUT ME", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-rule pb-8 pt-4 text-center text-[10px] text-muted">
      <p>
        {footerLinks.map((link, i) => (
          <span key={link.href}>
            {i > 0 && " | "}
            <Link href={link.href} className="no-underline hover:underline">
              {link.label}
            </Link>
          </span>
        ))}
      </p>
      <p className="mt-3 text-ink">
        Copyright ©{new Date().getFullYear()} {portfolioData.name}. All Rights
        Reserved.
      </p>
    </footer>
  );
}
