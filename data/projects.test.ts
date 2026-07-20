import { describe, it, expect } from "vitest";
import { projects, projectCategories } from "./projects";

const VALID_CATEGORY = ["backend", "frontend", "fullstack", "web3", "other"];
const URL_RE = /^https?:\/\/.+/;

describe("projects", () => {
  describe("positive case", () => {
    it("is a non-empty array", () => {
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it("gives every project the required fields", () => {
      for (const p of projects) {
        expect(typeof p.title).toBe("string");
        expect(p.title.length).toBeGreaterThan(0);
        expect(typeof p.description).toBe("string");
        expect(p.description.length).toBeGreaterThan(0);
        expect(typeof p.image).toBe("string");
        expect(p.image.length).toBeGreaterThan(0);
        expect(Array.isArray(p.tags)).toBe(true);
      }
    });
  });

  describe("negative case", () => {
    it("uses only category values in the Project union", () => {
      for (const p of projects) {
        expect(VALID_CATEGORY).toContain(p.category);
      }
    });

    it("maps every project category to a declared filter category id", () => {
      const ids = projectCategories.map((c) => c.id);
      for (const p of projects) {
        expect(ids).toContain(p.category);
      }
    });

    it("uses http(s) URLs for github and live links when present", () => {
      for (const p of projects) {
        if (p.github !== undefined) expect(p.github).toMatch(URL_RE);
        if (p.live !== undefined) expect(p.live).toMatch(URL_RE);
      }
    });
  });

  describe("edge case", () => {
    it("keeps featured as a boolean when provided", () => {
      for (const p of projects) {
        if (p.featured !== undefined) expect(typeof p.featured).toBe("boolean");
      }
    });

    it("keeps caseStudySlug a non-empty string when provided", () => {
      for (const p of projects) {
        if (p.caseStudySlug !== undefined) {
          expect(typeof p.caseStudySlug).toBe("string");
          expect(p.caseStudySlug.length).toBeGreaterThan(0);
        }
      }
    });

    it("exposes an 'all' filter plus one entry per real category", () => {
      const ids = projectCategories.map((c) => c.id);
      expect(ids).toContain("all");
      for (const category of VALID_CATEGORY) {
        expect(ids).toContain(category);
      }
    });
  });
});
