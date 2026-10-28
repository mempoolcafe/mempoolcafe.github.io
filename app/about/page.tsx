import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import PageHeader from "@/components/page-header";
import { portfolioData } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About Me",
};

const jumpLinks = [
  { id: "education", label: "education" },
  { id: "coursework", label: "coursework" },
  { id: "experience", label: "experience" },
  { id: "clubs", label: "clubs" },
  { id: "resume", label: "resume" },
];

function BackToTop() {
  return (
    <p className="mt-2 text-right text-[11px]">
      <a href="#top">back to top ^</a>
    </p>
  );
}

export default function AboutPage() {
  const { name, location, email, resumeUrl, about, socials, experience } =
    portfolioData;
  const { schools, coursework, clubs } = portfolioData.education;
  const currentSchool = schools[0];

  // Old-school profile card: label | value rows.
  const details: { label: string; value: ReactNode }[] = [
    { label: "Name", value: name },
    { label: "Location", value: location },
    ...(currentSchool
      ? [
          { label: "School", value: currentSchool.school },
          { label: "Studying", value: currentSchool.degree },
        ]
      : []),
    { label: "Email", value: <a href={`mailto:${email}`}>{email}</a> },
    {
      label: "Online",
      value: socials
        .filter((social) => social.href.startsWith("http"))
        .map((social, i) => (
          <span key={social.label}>
            {i > 0 && " | "}
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              {social.label}
            </a>
          </span>
        )),
    },
    {
      label: "Resume",
      value: (
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          download (PDF)
        </a>
      ),
    },
  ];

  return (
    <>
      <div id="top" className="scroll-mt-4">
        <PageHeader title="About Me" />
      </div>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {about.photo && (
          <div className="mx-auto w-fit shrink-0 border border-rule p-1 sm:mx-0">
            <Image
              src={about.photo}
              alt={`Portrait of ${name}`}
              width={160}
              height={200}
              className="h-[200px] w-[160px] object-cover"
              priority
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <table className="table-striped">
            <tbody>
              {details.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="w-24 whitespace-nowrap">
                    {row.label}:
                  </th>
                  <td className="break-words">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        {about.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <p className="mt-4 border border-rule bg-[#f4f4f0] px-3 py-2 text-[12px]">
        <span className="font-bold">jump to:</span>{" "}
        {jumpLinks.map((link, i) => (
          <span key={link.id}>
            {i > 0 && " | "}
            <a href={`#${link.id}`}>{link.label}</a>
          </span>
        ))}
      </p>

      <section id="education" className="mt-6 scroll-mt-4">
        <PageHeader title="Education" as="h2" />
        <div className="space-y-3">
          {schools.map((edu) => (
            <div key={edu.school} className="box">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="caption text-[13px]">{edu.school}</h3>
                <p className="text-[11px] text-muted">{edu.period}</p>
              </div>
              <p className="font-bold">{edu.degree}</p>
              {edu.details && <p className="text-muted">{edu.details}</p>}
            </div>
          ))}
        </div>
        <BackToTop />
      </section>

      <section id="coursework" className="mt-4 scroll-mt-4">
        <PageHeader title="Relevant Coursework" color="blue" as="h2" />
        <table className="table-striped">
          <thead>
            <tr>
              <th className="w-24">Code</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {coursework.map((course) => (
              <tr key={`${course.code}-${course.name}`}>
                <td className="whitespace-nowrap font-bold">{course.code}</td>
                <td>{course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BackToTop />
      </section>

      <section id="experience" className="mt-4 scroll-mt-4">
        <PageHeader title="Experience" as="h2" />
        <ol className="space-y-4">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="box">
              <h3 className="caption text-[13px]">{job.role}</h3>
              <p className="font-bold">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </p>
              <p className="text-[11px] text-muted">
                {job.period}
                {job.location ? ` · ${job.location}` : ""}
              </p>
              <ul className="mt-2 list-[square] space-y-1 pl-5">
                {job.highlights.map((highlight, j) => (
                  <li key={j}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <BackToTop />
      </section>

      <section id="clubs" className="mt-4 scroll-mt-4">
        <PageHeader title="Clubs & Involvement" color="blue" as="h2" />
        <ul className="box divide-y divide-dashed divide-rule py-0">
          {clubs.map((club) => (
            <li key={club.name} className="py-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="caption text-[12px]">{club.name}</h3>
                {club.period && (
                  <p className="text-[11px] text-muted">{club.period}</p>
                )}
              </div>
              {club.role && <p className="font-bold">{club.role}</p>}
              {club.description && (
                <p className="text-muted">{club.description}</p>
              )}
            </li>
          ))}
        </ul>
        <BackToTop />
      </section>

      <section id="resume" className="mt-4 scroll-mt-4">
        <PageHeader title="Resume" as="h2" />
        <p className="mb-2 font-bold">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            open / download my resume (PDF) &gt;&gt;
          </a>
        </p>
        {/* Phones handle inline PDFs poorly, so they just get the link. */}
        <object
          data={resumeUrl}
          type="application/pdf"
          aria-label={`${name}'s resume`}
          className="hidden h-[720px] w-full border border-rule sm:block"
        >
          <p className="p-3">
            Your browser can&apos;t show PDFs here &mdash;{" "}
            <a href={resumeUrl}>download it instead</a>.
          </p>
        </object>
        <BackToTop />
      </section>
    </>
  );
}
