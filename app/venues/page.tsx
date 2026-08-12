import type { Metadata } from "next";
import { ScaleIndexPage } from "@/components/ScaleIndexPage";

export const metadata: Metadata = {
  title: "Venues",
  description:
    "Experience venues where PHNTM runs the technology that delivers night after night.",
  alternates: { canonical: "/venues" },
  openGraph: {
    title: "Venues · PHNTM",
    description:
      "Experience venues where PHNTM runs the technology that delivers night after night.",
    url: "/venues",
    type: "website",
  },
};

export default function VenuesPage() {
  return <ScaleIndexPage scale="venues" />;
}
