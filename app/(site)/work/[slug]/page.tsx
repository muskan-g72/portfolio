import { CaseStudy } from "@/components/case/CaseStudy";
import { ProjectThemeSync } from "@/components/providers/ProjectThemeSync";
import { content, getProject } from "@/content/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return content.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.tagline} ${project.description}`,
    openGraph: {
      title: `${project.name} — Muskan`,
      description: `${project.tagline} ${project.description}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Muskan`,
      description: `${project.tagline} ${project.description}`,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <ProjectThemeSync slug={project.slug} />
      <CaseStudy project={project} />
    </main>
  );
}
