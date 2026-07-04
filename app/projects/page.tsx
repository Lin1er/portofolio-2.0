import type { Metadata } from "next";
import { ProjectsPageContent } from "./projects-content";
import { siteConfig } from "@/data";

const title = "Projects";
const description =
  "Every project I've shipped - backend systems, full-stack apps, AI products, and multi-chain dApps across EVM, Solana, and Sui.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
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
      name: "Projects",
      item: `${siteConfig.url}/projects`,
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectsPageContent />
    </>
  );
}
