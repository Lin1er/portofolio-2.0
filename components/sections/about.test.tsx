import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./about";
import { stats } from "@/data";

describe("AboutSection", () => {
  describe("positive case", () => {
    it("renders the about section anchor", () => {
      const { container } = render(<AboutSection />);
      expect(container.querySelector("#about")).not.toBeNull();
    });

    it("renders each stat label", () => {
      render(<AboutSection />);
      for (const stat of stats) {
        expect(
          screen.getAllByText(new RegExp(stat.label, "i")).length,
        ).toBeGreaterThan(0);
      }
    });
  });
});
