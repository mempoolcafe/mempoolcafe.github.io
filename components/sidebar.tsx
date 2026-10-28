import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";
import PageHeader from "@/components/page-header";
import AcceptedTokens from "@/components/accepted-tokens";

export default function Sidebar() {
  const { resumeUrl, socials } = portfolioData;

  return (
    <aside className="space-y-5 text-[12px]">
      <section>
        <PageHeader title="Quick Links" as="h2" className="mb-0" />
        <ul className="box space-y-1 border-t-0 font-bold">
          <li>
            <Link href="/about">About Me &gt;&gt;</Link>
          </li>
          <li>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              My Resume &gt;&gt;
            </a>
          </li>
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                {...(social.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {social.label} &gt;&gt;
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <PageHeader title="Donate" color="blue" as="h2" className="mb-0" />
        <div className="box space-y-2 border-t-0 text-center">
          <p>like what you read? leave a tip in the jar!</p>
          <Link href="/donate" className="btn-donate">
            Donate
          </Link>
          <AcceptedTokens className="justify-center" showLabel={false} />
        </div>
      </section>
    </aside>
  );
}
