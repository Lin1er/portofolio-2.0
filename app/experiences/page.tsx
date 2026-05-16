import type { Metadata } from "next";
import { ExperiencesPageContent } from "./experiences-content";
import { siteConfig } from "@/data";

const title = "Experiences";
const description =
  "My journey as a developer - education, work experience, achievements, and milestones.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/experiences",
  },
  openGraph: {
    type: "profile",
    url: `${siteConfig.url}/experiences`,
    title: `${title} | ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Experiences",
      item: `${siteConfig.url}/experiences`,
    },
  ],
};

export default function ExperiencesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ExperiencesPageContent />
    </>
  );
}
