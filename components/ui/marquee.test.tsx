import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Marquee } from "./marquee";

describe("Marquee", () => {
  describe("positive case", () => {
    it("renders its children (duplicated for the seamless loop)", () => {
      render(
        <Marquee>
          <span>tech-item</span>
        </Marquee>,
      );
      // Marquee renders the children twice to create the loop.
      expect(screen.getAllByText("tech-item").length).toBe(2);
    });
  });

  describe("edge case", () => {
    it("forwards a custom className to the wrapper", () => {
      const { container } = render(
        <Marquee className="wrap-class">
          <span>x</span>
        </Marquee>,
      );
      expect((container.firstElementChild as HTMLElement).className).toContain(
        "wrap-class",
      );
    });
  });
});
