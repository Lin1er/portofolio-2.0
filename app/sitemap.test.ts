import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { siteConfig } from "@/data/config";

describe("sitemap", () => {
  describe("positive case", () => {
    it("returns entries rooted at the configured site url", () => {
      const entries = sitemap();
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.url.startsWith(siteConfig.url)).toBe(true);
      }
    });

    it("includes the home, projects, and experiences routes", () => {
      const urls = sitemap().map((e) => e.url);
      expect(urls).toContain(siteConfig.url);
      expect(urls).toContain(`${siteConfig.url}/projects`);
      expect(urls).toContain(`${siteConfig.url}/experiences`);
    });
  });

  describe("edge case", () => {
    it("gives the home route the highest priority", () => {
      const home = sitemap().find((e) => e.url === siteConfig.url);
      expect(home?.priority).toBe(1);
    });
  });
});
