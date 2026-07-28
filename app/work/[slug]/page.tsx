import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../_components/project-detail";
import {
  getWorkProject,
  workProjects,
} from "../../../content/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getWorkProject((await params).slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
      }
    : {};
}

export default async function WorkProjectPage({ params }: ProjectPageProps) {
  const project = getWorkProject((await params).slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
