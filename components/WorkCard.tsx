import Link from "next/link";
import type { Project } from "@/data/projects";
import { SCALE_LABEL, projectPath } from "@/lib/paths";

export function WorkCard({
  project,
  index,
  delay,
}: {
  project: Project;
  /** 1-based position in the grid; the first card is eager + high-priority. */
  index?: number;
  delay?: 0 | 1;
}) {
  const isLcpCandidate = (index ?? 99) <= 1;
  return (
    <Link
      className="work-card"
      href={projectPath(project)}
      data-scale={project.scale}
      data-reveal
      data-reveal-d={delay ? String(delay) : undefined}
    >
      <div className="frame media">
        {project.heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImage}
              alt={project.heroImageAlt ?? ""}
              loading={isLcpCandidate ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={isLcpCandidate ? "high" : "auto"}
              style={
                project.heroImagePosition
                  ? { objectPosition: project.heroImagePosition }
                  : undefined
              }
            />
            <div className="scrim" />
          </>
        ) : (
          <div className="media__ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="reg"
              src="/brand/registration-ink.svg"
              alt=""
            />
            <div className="t">
              <b>{project.name}</b>
            </div>
          </div>
        )}
        <span className="media__tag">{SCALE_LABEL[project.scale]}</span>
      </div>
      <div className="meta">
        <span className="name">{project.name}</span>
        <span className="year">{project.yearLabel}</span>
      </div>
    </Link>
  );
}
