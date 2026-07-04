import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsPageContent } from "./projects-content";
import { projects } from "@/data";

describe("ProjectsPageContent", () => {
  describe("positive case", () => {
    it("renders every project from data", () => {
      render(<ProjectsPageContent />);
      const cards = screen
        .getAllByRole("button")
        .filter((b) =>
          b.getAttribute("aria-label")?.startsWith("View details for"),
        );
      expect(cards.length).toBe(projects.length);
    });

    it("offers a Back to Home link anchored to the projects section", () => {
      render(<ProjectsPageContent />);
      // The dedicated back link — not the navbar brand logo (href="/").
      const back = screen.getByRole("link", { name: /Back to Home/i });
      expect(back).toHaveAttribute("href", "/#projects");
    });

    it("summarizes the total project count", () => {
      render(<ProjectsPageContent />);
      expect(screen.getByText("Total Projects")).toBeInTheDocument();
      expect(
        screen.getAllByText(String(projects.length)).length,
      ).toBeGreaterThan(0);
    });
  });
});
