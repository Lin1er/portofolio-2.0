import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "./skills";
import { skills } from "@/data";

describe("SkillsSection", () => {
  describe("positive case", () => {
    it("renders the skills section anchor", () => {
      const { container } = render(<SkillsSection />);
      expect(container.querySelector("#skills")).not.toBeNull();
    });

    it("renders individual skill names from data", () => {
      render(<SkillsSection />);
      const sample = skills.frontend[0].name; // e.g. "React"
      expect(
        screen.getAllByText(new RegExp(sample, "i")).length,
      ).toBeGreaterThan(0);
    });
  });
});
