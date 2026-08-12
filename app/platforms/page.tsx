import type { Metadata } from "next";
import { ScaleIndexPage } from "@/components/ScaleIndexPage";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Repeatable entertainment properties PHNTM designs, builds, and operates.",
  alternates: { canonical: "/platforms" },
  openGraph: {
    title: "Platforms · PHNTM",
    description:
      "Repeatable entertainment properties PHNTM designs, builds, and operates.",
    url: "/platforms",
    type: "website",
  },
};

export default function PlatformsPage() {
  return <ScaleIndexPage scale="platforms" />;
}
