import type { NextConfig } from "next";
import { projects } from "./data/projects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/work.html", destination: "/work", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      {
        source: "/work",
        has: [{ type: "query", key: "scale", value: "moments" }],
        destination: "/moments",
        permanent: true,
      },
      {
        source: "/work",
        has: [{ type: "query", key: "scale", value: "platforms" }],
        destination: "/platforms",
        permanent: true,
      },
      {
        source: "/work",
        has: [{ type: "query", key: "scale", value: "venues" }],
        destination: "/venues",
        permanent: true,
      },
      ...projects.map((p) => ({
        source: `/work/${p.slug}`,
        destination: `/${p.scale}/${p.slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
