import { describe, it, expect } from "vitest";
import { caseStudies } from "./case-studies";
import { projects } from "./projects";

const URL_RE = /^https?:\/\/.+/;
const SLUG_RE = /^[a-z0-9-]+$/;

describe("caseStudies", () => {
  describe("positive case", () => {
    it("is a non-empty array with all required fields populated", () => {
      expect(caseStudies.length).toBeGreaterThan(0);
      for (const c of caseStudies) {
        expect(c.slug.length).toBeGreaterThan(0);
        expect(c.projectTitle.length).toBeGreaterThan(0);
        expect(c.headline.length).toBeGreaterThan(0);
        expect(c.summary.length).toBeGreaterThan(0);
        expect(c.problem.length).toBeGreaterThan(0);
        expect(c.build.length).toBeGreaterThan(0);
        expect(c.architecture.length).toBeGreaterThan(0);
        expect(c.highlights.length).toBeGreaterThan(0);
        expect(c.stack.length).toBeGreaterThan(0);
        expect(c.links.length).toBeGreaterThan(0);
      }
    });
  });

  describe("negative case", () => {
    it("uses url-safe slugs", () => {
      for (const c of caseStudies) {
        expect(c.slug).toMatch(SLUG_RE);
      }
    });

    it("uses http(s) URLs for every link", () => {
      for (const c of caseStudies) {
        for (const link of c.links) {
          expect(link.label.length).toBeGreaterThan(0);
          expect(link.href).toMatch(URL_RE);
        }
      }
    });

    it("keeps slugs unique", () => {
      const slugs = caseStudies.map((c) => c.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("edge case", () => {
    it("points every case study at a real project title", () => {
      const titles = new Set(projects.map((p) => p.title));
      for (const c of caseStudies) {
        expect(titles.has(c.projectTitle)).toBe(true);
      }
    });

    it("resolves every project.caseStudySlug to a real case study", () => {
      const slugs = new Set(caseStudies.map((c) => c.slug));
      for (const p of projects) {
        if (p.caseStudySlug !== undefined) {
          expect(slugs.has(p.caseStudySlug)).toBe(true);
        }
      }
    });
  });
});
