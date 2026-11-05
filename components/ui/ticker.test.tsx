import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ticker } from "./ticker";

describe("Ticker", () => {
  describe("positive case", () => {
    it("renders the items twice, upper-cased, for a seamless loop", () => {
      render(<Ticker items={["Backend", "AI"]} />);
      expect(screen.getAllByText("BACKEND")).toHaveLength(2);
      expect(screen.getAllByText("AI")).toHaveLength(2);
    });
  });

  describe("edge case", () => {
    it("hides the duplicate copy and applies duration and direction", () => {
      const { container } = render(<Ticker items={["x"]} duration={12} reverse />);
      const track = screen.getByTestId("ticker-track");
      expect(track).toHaveClass("reverse");
      expect(track.style.getPropertyValue("--marquee-duration")).toBe("12s");
      expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    });

    it("runs forward by default", () => {
      render(<Ticker items={["x"]} />);
      expect(screen.getByTestId("ticker-track")).not.toHaveClass("reverse");
    });
  });
});
