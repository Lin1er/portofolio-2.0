import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperiencesPageContent } from "./experiences-content";
import { experiences } from "@/data";

describe("ExperiencesPageContent", () => {
  describe("positive case", () => {
    it("renders experience entries from data", () => {
      render(<ExperiencesPageContent />);
      const first = experiences[0];
      expect(
        screen.getAllByText(new RegExp(first.title, "i")).length,
      ).toBeGreaterThan(0);
    });

    it("offers a Back to Home link anchored to the experience section", () => {
      render(<ExperiencesPageContent />);
      // The dedicated back link — not the navbar brand logo (href="/").
      const back = screen.getByRole("link", { name: /Back to Home/i });
      expect(back).toHaveAttribute("href", "/#experience");
    });
  });
});
