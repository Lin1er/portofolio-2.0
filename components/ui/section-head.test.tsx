import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHead } from "./section-head";

describe("SectionHead", () => {
  describe("positive case", () => {
    it("renders the index, the title as a heading, and the note", () => {
      render(<SectionHead index="[01] — Log" title="LOG." note="Newest first" />);
      expect(screen.getByText("[01] — Log")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2, name: "LOG." })).toBeInTheDocument();
      expect(screen.getByText("Newest first")).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("omits the note when none is given", () => {
      const { container } = render(<SectionHead index="i" title="T" />);
      expect(container.querySelectorAll(".label")).toHaveLength(1);
    });
  });
});
