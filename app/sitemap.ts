import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL, projectPath } from "@/lib/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/work",
    "/moments",
    "/platforms",
    "/venues",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/work" || path.startsWith("/m") || path.startsWith("/p") || path.startsWith("/v") ? 0.9 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}${projectPath(p)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
