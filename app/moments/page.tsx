import type { Metadata } from "next";
import { ScaleIndexPage } from "@/components/ScaleIndexPage";

export const metadata: Metadata = {
  title: "Moments",
  description:
    "One-night launches, shows, and reveals designed, built, and run end to end by PHNTM.",
  alternates: { canonical: "/moments" },
  openGraph: {
    title: "Moments · PHNTM",
    description:
      "One-night launches, shows, and reveals designed, built, and run end to end by PHNTM.",
    url: "/moments",
    type: "website",
  },
};

export default function MomentsPage() {
  return <ScaleIndexPage scale="moments" />;
}
