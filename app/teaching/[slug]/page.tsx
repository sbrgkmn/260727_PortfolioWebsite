import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../_components/project-detail";
import {
  getTeachingProject,
  teachingProjects,
} from "../../../content/portfolio";

type TeachingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return teachingProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TeachingPageProps): Promise<Metadata> {
  const project = getTeachingProject((await params).slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
      }
    : {};
}

export default async function TeachingProjectPage({
  params,
}: TeachingPageProps) {
  const project = getTeachingProject((await params).slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
