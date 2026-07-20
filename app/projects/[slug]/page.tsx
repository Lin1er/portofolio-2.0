import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, projects, siteConfig } from "@/data";
import { CaseStudyContent } from "./case-study-content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    return { title: "Case study not found" };
  }

  const title = `${caseStudy.projectTitle} — Case Study`;
  const description = caseStudy.summary;
  const url = `${siteConfig.url}/projects/${caseStudy.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${caseStudy.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) notFound();

  const project = projects.find((p) => p.title === caseStudy.projectTitle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteConfig.url}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: caseStudy.projectTitle,
            item: `${siteConfig.url}/projects/${caseStudy.slug}`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: caseStudy.headline,
        description: caseStudy.summary,
        author: { "@type": "Person", name: siteConfig.author.name },
        about: caseStudy.projectTitle,
        url: `${siteConfig.url}/projects/${caseStudy.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyContent caseStudy={caseStudy} project={project} />
    </>
  );
}
