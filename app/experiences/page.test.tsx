import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ExperiencesPage, { metadata } from "./page";
import { siteConfig } from "@/data";

describe("ExperiencesPage metadata", () => {
  describe("positive case", () => {
    it("sets a canonical /experiences alternate", () => {
      expect((metadata.alternates as { canonical: string }).canonical).toBe(
        "/experiences",
      );
    });

    it("titles the OG/twitter cards with the site name", () => {
      const og = metadata.openGraph as { title?: string };
      expect(og.title).toContain(siteConfig.name);
    });
  });
});

describe("ExperiencesPage render", () => {
  describe("positive case", () => {
    it("emits BreadcrumbList JSON-LD and the page content", () => {
      const { container } = render(<ExperiencesPage />);
      const ld = container.querySelector('script[type="application/ld+json"]');
      expect(ld?.innerHTML).toContain("BreadcrumbList");
      expect(container.textContent).toBeTruthy();
    });
  });
});
