import type { Metadata } from "next";
import {
  ProjectDetailPage,
  generateProjectMetadata,
  generateScaleStaticParams,
} from "@/lib/project-page";

export function generateStaticParams() {
  return generateScaleStaticParams("platforms");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateProjectMetadata("platforms", slug);
}

export default async function PlatformsProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailPage scale="platforms" slug={slug} />;
}
