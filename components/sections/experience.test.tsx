import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ExperienceSection, formatPeriod } from "./experience";
import { experiences, homeContent, siteConfig } from "@/data";

const { log } = homeContent;

describe("ExperienceSection", () => {
  describe("positive case", () => {
    it("renders the #experience anchor and the LOG. title", () => {
      const { container } = render(<ExperienceSection />);
      expect(container.querySelector("#experience")).not.toBeNull();
      expect(screen.getByRole("heading", { name: log.title })).toBeInTheDocument();
    });

    it("renders the curated entries in order with their organization", () => {
      render(<ExperienceSection />);
      const rows = within(screen.getByRole("list")).getAllByRole("listitem");
      const expected = log.entries.slice(0, siteConfig.homepage.experiencesLimit);
      expect(rows).toHaveLength(expected.length);
      expected.forEach((title, i) => {
        const exp = experiences.find((e) => e.title === title)!;
        expect(rows[i]).toHaveTextContent(title);
        expect(rows[i]).toHaveTextContent(exp.organization);
      });
    });

    it("links to the full history page", () => {
      render(<ExperienceSection />);
      expect(screen.getByRole("link", { name: new RegExp(log.more.label, "i") }))
        .toHaveAttribute("href", log.more.href);
    });
  });

  describe("negative case", () => {
    it("every curated title exists in experiences", () => {
      for (const title of log.entries) {
        expect(experiences.some((e) => e.title === title)).toBe(true);
      }
    });
  });

  describe("edge case", () => {
    it("formats periods with arrows and Now", () => {
      expect(formatPeriod("Jul 2026 - Present")).toBe("Jul 2026 → Now");
      expect(formatPeriod("2025")).toBe("2025");
    });
  });
});
