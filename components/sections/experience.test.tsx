import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "./experience";
import { experiences, siteConfig } from "@/data";

describe("ExperienceSection", () => {
  describe("positive case", () => {
    it("renders the experience section anchor", () => {
      const { container } = render(<ExperienceSection />);
      expect(container.querySelector("#experience")).not.toBeNull();
    });

    it("renders the most recent experiences up to the homepage limit", () => {
      render(<ExperienceSection />);
      const first = experiences[0];
      expect(
        screen.getAllByText(new RegExp(first.title, "i")).length,
      ).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("does not render experiences beyond the homepage limit", () => {
      render(<ExperienceSection />);
      const limit = siteConfig.homepage.experiencesLimit;
      const beyond = experiences[limit]; // first item excluded by the slice
      if (beyond) {
        expect(screen.queryByText(new RegExp(`^${beyond.title}$`, "i"))).toBeNull();
      }
    });
  });
});
