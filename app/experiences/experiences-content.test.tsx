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

    it("offers a back link to the home page", () => {
      render(<ExperiencesPageContent />);
      const homeLinks = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === "/");
      expect(homeLinks.length).toBeGreaterThan(0);
    });
  });
});
