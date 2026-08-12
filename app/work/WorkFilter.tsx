"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import type { Project, Scale } from "@/data/projects";

type Filter = "all" | Scale | "originals";
type Sort = "none" | "az" | "year";

// Flip to `true` to bring the Originals slate back into the work filter.
// Leaves all related code in place — the placeholder cards still render when
// `active === "originals"` below, so this is a one-line reactivation.
const SHOW_ORIGINALS = false;

const ALL_FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "moments", label: "Moments" },
  { id: "platforms", label: "Platforms" },
  { id: "venues", label: "Venues" },
  { id: "originals", label: "Originals" },
];

const FILTERS = SHOW_ORIGINALS
  ? ALL_FILTERS
  : ALL_FILTERS.filter((f) => f.id !== "originals");

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
      if (ya !== yb) return yb - ya; // newest first
      return a.name.localeCompare(b.name);
    });
  }
  return sorted;
}

export function WorkFilter({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const initial = (searchParams?.get("scale") || "all").toLowerCase() as Filter;
  const [active, setActive] = useState<Filter>(
    FILTERS.some((f) => f.id === initial) ? initial : "all"
  );
  const [sort, setSort] = useState<Sort>("none");

  useEffect(() => {
    const next = (searchParams?.get("scale") || "all").toLowerCase() as Filter;
    if (FILTERS.some((f) => f.id === next)) setActive(next);
  }, [searchParams]);

  const shown = useMemo(() => {
    if (active === "originals") return [];
    const filtered = active === "all" ? projects : projects.filter((p) => p.scale === active);
    return sortProjects(filtered, sort);
  }, [active, projects, sort]);

  const count = active === "originals" ? 6 : shown.length;

  return (
    <>
      <div className="filterbar">
        <div className="filterbar__chips">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className="chip"
              aria-pressed={f.id === active}
              onClick={() => setActive(f.id)}
              type="button"
            >
              {f.label}
            </button>
          ))}
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
          <b>{String(count).padStart(2, "0")}</b> Projects
        </div>
      </div>

      <div className="index-grid">
        {active === "originals"
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                className="work-card"
                key={`orig-${i}`}
                data-scale="originals"
                data-reveal
              >
                <div className="frame media">
                  <div className="media__ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="reg"
                      src="/brand/registration-ink.svg"
                      alt=""
                    />
                    <div className="t">
                      <b>Original {String(i + 1).padStart(2, "0")}</b>, drop
                      media here
                    </div>
                  </div>
                  <span className="media__corner">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="media__tag">Originals</span>
                </div>
                <div className="meta">
                  <span className="name">
                    Original {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="year">’26</span>
                </div>
                <div className="scope">PHNTM Original · In development</div>
              </div>
            ))
          : shown.map((p, i) => (
              <WorkCard key={p.slug} project={p} index={i + 1} />
            ))}
      </div>
    </>
  );
}
