import { describe, it, expect } from "vitest";
import manifest from "./manifest";
import { siteConfig } from "@/data/config";

describe("manifest", () => {
  describe("positive case", () => {
    it("exposes core PWA fields derived from siteConfig", () => {
      const m = manifest();
      expect(m.name).toContain(siteConfig.name);
      expect(m.short_name && m.short_name.length).toBeGreaterThan(0);
      expect(m.description).toBe(siteConfig.description);
      expect(m.theme_color).toBe(siteConfig.theme.accentColor);
    });
  });

  describe("negative case", () => {
    it("starts at the site root in standalone display", () => {
      const m = manifest();
      expect(m.start_url).toBe("/");
      expect(m.display).toBe("standalone");
    });

    it("provides a non-empty icon set with sizes and types", () => {
      const m = manifest();
      expect(Array.isArray(m.icons)).toBe(true);
      expect(m.icons!.length).toBeGreaterThan(0);
      for (const icon of m.icons!) {
        expect(icon.src.length).toBeGreaterThan(0);
        expect(icon.sizes).toBeDefined();
        expect(icon.type).toBe("image/png");
      }
    });
  });

  describe("edge case", () => {
    it("includes a maskable icon for adaptive launchers", () => {
      const purposes = manifest().icons!.map((i) => i.purpose);
      expect(purposes).toContain("maskable");
    });
  });
});
