import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { notFound } from "next/navigation";
import CaseStudyPage, {
  generateStaticParams,
  generateMetadata,
} from "./page";
import { caseStudies, siteConfig } from "@/data";

const slug = caseStudies[0].slug;

describe("CaseStudyPage params + metadata", () => {
  describe("positive case", () => {
    it("pre-generates a static param for every case study", () => {
      const params = generateStaticParams();
      expect(params).toEqual(caseStudies.map((c) => ({ slug: c.slug })));
    });

    it("builds canonical metadata for a known slug", async () => {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug }),
      });
      expect(meta.title).toContain(caseStudies[0].projectTitle);
      expect((meta.alternates as { canonical: string }).canonical).toBe(
        `/projects/${slug}`,
      );
      const og = meta.openGraph as { title?: string };
      expect(og.title).toContain(siteConfig.name);
    });
  });

  describe("negative case", () => {
    it("returns a not-found title for an unknown slug", async () => {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: "does-not-exist" }),
      });
      expect(meta.title).toBe("Case study not found");
    });
  });
});

describe("CaseStudyPage render", () => {
  describe("positive case", () => {
    it("emits BreadcrumbList + TechArticle JSON-LD and the content", async () => {
      const el = await CaseStudyPage({ params: Promise.resolve({ slug }) });
      const { container } = render(el);
      const ld = container.querySelector('script[type="application/ld+json"]');
      expect(ld?.innerHTML).toContain("BreadcrumbList");
      expect(ld?.innerHTML).toContain("TechArticle");
      expect(container.textContent).toContain(caseStudies[0].headline);
    });
  });

  describe("negative case", () => {
    it("calls notFound for an unknown slug", async () => {
      await expect(
        CaseStudyPage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
      ).rejects.toThrow();
      expect(notFound).toHaveBeenCalled();
    });
  });
});
