import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GrantDetail } from "../../_components/grant-detail";
import { getGrant, grants } from "../../../content/portfolio";

type GrantPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return grants.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GrantPageProps): Promise<Metadata> {
  const grant = getGrant((await params).slug);
  return grant
    ? {
        title: grant.title,
        description: grant.summary,
      }
    : {};
}

export default async function GrantPage({ params }: GrantPageProps) {
  const grant = getGrant((await params).slug);

  if (!grant) {
    notFound();
  }

  return <GrantDetail grant={grant} />;
}
