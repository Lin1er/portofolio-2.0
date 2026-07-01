import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MagneticButton } from "./magnetic-button";

describe("MagneticButton", () => {
  describe("positive case", () => {
    it("renders its children", () => {
      render(
        <MagneticButton>
          <button>Click me</button>
        </MagneticButton>,
      );
      expect(
        screen.getByRole("button", { name: /Click me/i }),
      ).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("handles mouse move and leave without throwing", () => {
      const { container } = render(
        <MagneticButton>
          <span>x</span>
        </MagneticButton>,
      );
      const el = container.firstElementChild as HTMLElement;
      expect(() => {
        fireEvent.mouseMove(el, { clientX: 10, clientY: 10 });
        fireEvent.mouseLeave(el);
      }).not.toThrow();
    });
  });
});
