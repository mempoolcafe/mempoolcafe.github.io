import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { portfolioData } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" />
      <ol className="space-y-4">
        {portfolioData.projects.map((project, i) => (
          <li key={project.name} className="box">
            <h2 className="caption text-[13px]">
              <span className="text-muted">
                {String(i + 1).padStart(2, "0")}.
              </span>{" "}
              {project.name}
            </h2>
            <p className="mt-1">{project.description}</p>
            <p className="mt-2 text-[11px] text-muted">
              <span className="font-bold">built with:</span>{" "}
              {project.tech.join(", ")}
            </p>
            {(project.github || project.demo) && (
              <p className="mt-1 font-bold">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3"
                  >
                    [source]
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [demo]
                  </a>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
