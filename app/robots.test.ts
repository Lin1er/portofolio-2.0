import { describe, it, expect } from "vitest";
import robots from "./robots";
import { siteConfig } from "@/data/config";

describe("robots", () => {
  describe("positive case", () => {
    it("allows crawling the site root", () => {
      const result = robots();
      const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
      expect(rules?.userAgent).toBe("*");
      expect(rules?.allow).toBe("/");
    });

    it("points to the sitemap and host from siteConfig", () => {
      const result = robots();
      expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
      expect(result.host).toBe(siteConfig.url);
    });
  });

  describe("edge case", () => {
    it("disallows the api path", () => {
      const result = robots();
      const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
      expect(rules?.disallow).toContain("/api/");
    });
  });
});
