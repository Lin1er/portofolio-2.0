import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionWrapper } from "./section-wrapper";

describe("SectionWrapper", () => {
  describe("positive case", () => {
    it("renders its children", () => {
      render(
        <SectionWrapper>
          <p>inner content</p>
        </SectionWrapper>,
      );
      expect(screen.getByText("inner content")).toBeInTheDocument();
    });

    it("forwards id and className to the section element", () => {
      const { container } = render(
        <SectionWrapper id="about" className="custom-class">
          <span>x</span>
        </SectionWrapper>,
      );
      const section = container.querySelector("section");
      expect(section).not.toBeNull();
      expect(section).toHaveAttribute("id", "about");
      expect(section).toHaveClass("custom-class");
    });
  });

  describe("edge case", () => {
    it("renders without an id or className", () => {
      const { container } = render(
        <SectionWrapper>
          <span>y</span>
        </SectionWrapper>,
      );
      expect(container.querySelector("section")).not.toBeNull();
    });
  });
});
