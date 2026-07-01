import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsSection } from "./testimonials";
import { testimonials } from "@/data";

describe("TestimonialsSection", () => {
  describe("positive case", () => {
    it("renders the testimonials section anchor", () => {
      const { container } = render(<TestimonialsSection />);
      expect(container.querySelector("#testimonials")).not.toBeNull();
    });

    it("renders testimonial content from data", () => {
      render(<TestimonialsSection />);
      const first = testimonials[0];
      expect(
        screen.getAllByText(new RegExp(first.company, "i")).length,
      ).toBeGreaterThan(0);
    });
  });
});
