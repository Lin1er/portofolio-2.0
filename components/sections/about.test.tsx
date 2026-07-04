import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./about";
import { funFacts } from "@/data";

describe("AboutSection", () => {
  describe("positive case", () => {
    it("renders the about section anchor", () => {
      const { container } = render(<AboutSection />);
      expect(container.querySelector("#about")).not.toBeNull();
    });

    it("renders each fun fact label", () => {
      render(<AboutSection />);
      for (const fact of funFacts) {
        expect(
          screen.getAllByText(new RegExp(fact.label, "i")).length,
        ).toBeGreaterThan(0);
      }
    });
  });
});
