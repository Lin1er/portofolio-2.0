import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";
import { siteConfig } from "@/data";

describe("RootLayout metadata", () => {
  describe("positive case", () => {
    it("derives title default/template and description from siteConfig", () => {
      const title = metadata.title as { default: string; template: string };
      expect(title.default).toBe(siteConfig.title);
      expect(title.template).toBe(`%s | ${siteConfig.name}`);
      expect(metadata.description).toBe(siteConfig.description);
    });

    it("carries keywords and canonical root alternate", () => {
      expect(metadata.keywords).toEqual(siteConfig.keywords);
      expect((metadata.alternates as { canonical: string }).canonical).toBe("/");
    });
  });

  describe("edge case", () => {
    it("declares a google verification token", () => {
      expect(
        (metadata.verification as { google: string }).google.length,
      ).toBeGreaterThan(0);
    });
  });
});

describe("RootLayout render", () => {
  describe("positive case", () => {
    it("renders children and the JSON-LD structured data script", () => {
      // React 19 hoists <html>/<head> out of the RTL container, so assert
      // against the document rather than the returned container node.
      render(
        <RootLayout>
          <div data-testid="child">page body</div>
        </RootLayout>,
      );
      expect(document.querySelector('[data-testid="child"]')).not.toBeNull();
      const ld = document.querySelector('script[type="application/ld+json"]');
      expect(ld).not.toBeNull();
      expect(ld?.innerHTML).toContain("@graph");
    });
  });
});
