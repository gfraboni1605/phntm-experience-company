import type { Metadata } from "next";
import {
  ProjectDetailPage,
  generateProjectMetadata,
  generateScaleStaticParams,
} from "@/lib/project-page";

export function generateStaticParams() {
  return generateScaleStaticParams("venues");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateProjectMetadata("venues", slug);
}

export default async function VenuesProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailPage scale="venues" slug={slug} />;
}
