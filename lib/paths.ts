import type { Project, Scale } from "@/data/projects";

export const SCALE_LABEL: Record<Scale, string> = {
  moments: "Moments",
  platforms: "Platforms",
  venues: "Venues",
};

export const SITE_URL = "https://www.phntm.com";

export function scalePath(scale: Scale): `/${Scale}` {
  return `/${scale}`;
}

export function projectPath(
  project: Pick<Project, "scale" | "slug">
): `/${Scale}/${string}` {
  return `/${project.scale}/${project.slug}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
