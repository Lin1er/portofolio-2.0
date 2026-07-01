import { describe, it, expect } from "vitest";
import { siteConfig, animationConfig } from "./config";

describe("siteConfig", () => {
  describe("positive case", () => {
    it("exposes non-empty identity fields", () => {
      expect(siteConfig.name.length).toBeGreaterThan(0);
      expect(siteConfig.title.length).toBeGreaterThan(0);
      expect(siteConfig.description.length).toBeGreaterThan(0);
    });
  });

  describe("negative case", () => {
    it("has a url that parses as an absolute http(s) URL", () => {
      const parsed = new URL(siteConfig.url);
      expect(["http:", "https:"]).toContain(parsed.protocol);
    });

    it("has a non-empty keywords array of strings", () => {
      expect(Array.isArray(siteConfig.keywords)).toBe(true);
      expect(siteConfig.keywords.length).toBeGreaterThan(0);
      for (const k of siteConfig.keywords) {
        expect(typeof k).toBe("string");
        expect(k.length).toBeGreaterThan(0);
      }
    });

    it("has positive integer homepage limits", () => {
      const { experiencesLimit, projectsLimit } = siteConfig.homepage;
      expect(Number.isInteger(experiencesLimit)).toBe(true);
      expect(experiencesLimit).toBeGreaterThan(0);
      expect(Number.isInteger(projectsLimit)).toBe(true);
      expect(projectsLimit).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("uses a supported default theme mode and a hex accent color", () => {
      expect(["dark", "light"]).toContain(siteConfig.theme.defaultMode);
      expect(siteConfig.theme.accentColor).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    });
  });
});

describe("animationConfig", () => {
  describe("positive case", () => {
    it("exposes a positive preloader duration and stagger delay", () => {
      expect(animationConfig.preloaderDuration).toBeGreaterThan(0);
      expect(animationConfig.staggerDelay).toBeGreaterThan(0);
    });
  });
});
