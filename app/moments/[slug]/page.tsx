import type { Metadata } from "next";
import {
  ProjectDetailPage,
  generateProjectMetadata,
  generateScaleStaticParams,
} from "@/lib/project-page";

export function generateStaticParams() {
  return generateScaleStaticParams("moments");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateProjectMetadata("moments", slug);
}

export default async function MomentsProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailPage scale="moments" slug={slug} />;
}
