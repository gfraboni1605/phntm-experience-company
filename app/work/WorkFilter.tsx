"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import type { Project } from "@/data/projects";

type Sort = "none" | "az" | "year";

const SORTS: { id: Exclude<Sort, "none">; label: string }[] = [
  { id: "az", label: "A–Z" },
  { id: "year", label: "Newest" },
];

function sortProjects(items: Project[], mode: Sort): Project[] {
  if (mode === "none") return items;
  const sorted = [...items];
  if (mode === "az") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (mode === "year") {
    sorted.sort((a, b) => {
      const ya = parseInt(a.year, 10) || 0;
      const yb = parseInt(b.year, 10) || 0;
      if (ya !== yb) return yb - ya;
      return a.name.localeCompare(b.name);
    });
  }
  return sorted;
}

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [sort, setSort] = useState<Sort>("none");

  const shown = useMemo(
    () => sortProjects(projects, sort),
    [projects, sort]
  );

  return (
    <>
      <div className="filterbar">
        <div className="filterbar__chips">
          <Link className="chip" href="/work" aria-current="page">
            All
          </Link>
          <Link className="chip" href="/moments">
            Moments
          </Link>
          <Link className="chip" href="/platforms">
            Platforms
          </Link>
          <Link className="chip" href="/venues">
            Venues
          </Link>
          <span className="filterbar__sep" aria-hidden="true" />
          {SORTS.map((s) => (
            <button
              key={s.id}
              className="chip"
              aria-pressed={s.id === sort}
              onClick={() =>
                setSort((curr) => (curr === s.id ? "none" : s.id))
              }
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="filterbar__count">
          <b>{String(shown.length).padStart(2, "0")}</b> Projects
        </div>
      </div>

      <div className="index-grid">
        {shown.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i + 1} />
        ))}
      </div>
    </>
  );
}
