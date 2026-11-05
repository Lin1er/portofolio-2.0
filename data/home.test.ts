import { describe, it, expect } from "vitest";
import { homeContent } from "./home";
import { experiences } from "./experience";
import { projects, projectCategories } from "./projects";

describe("homeContent", () => {
  describe("positive case", () => {
    it("has non-empty hero, stats, ticker and tools", () => {
      expect(homeContent.hero.nameMain.length).toBeGreaterThan(0);
      expect(homeContent.stats.length).toBeGreaterThan(0);
      expect(homeContent.ticker.length).toBeGreaterThan(0);
      expect(homeContent.tools.items.length).toBeGreaterThan(0);
    });
  });

  describe("negative case", () => {
    it("references only experiences that exist", () => {
      for (const title of homeContent.log.entries) {
        expect(experiences.map((e) => e.title)).toContain(title);
      }
    });

    it("references only projects that exist", () => {
      for (const title of homeContent.work.entries) {
        expect(projects.map((p) => p.title)).toContain(title);
      }
    });

    it("labels every project category", () => {
      for (const cat of projectCategories.filter((c) => c.id !== "all")) {
        expect(homeContent.work.categoryLabels[cat.id]).toBeTruthy();
      }
    });

    it("uses internal links for the 'more' buttons", () => {
      expect(homeContent.log.more.href).toMatch(/^\//);
      expect(homeContent.work.more.href).toMatch(/^\//);
    });
  });

  describe("edge case", () => {
    it("has intro captions with rising thresholds, ending past 100", () => {
      const limits = homeContent.intro.captions.map((c) => c.until);
      expect([...limits].sort((a, b) => a - b)).toEqual(limits);
      expect(limits.at(-1)).toBeGreaterThan(100);
      expect(homeContent.intro.greetings.length).toBeGreaterThanOrEqual(1);
    });
  });
});
