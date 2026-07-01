import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Preloader } from "./preloader";

describe("Preloader", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  describe("positive case", () => {
    it("renders the loading brand while loading", () => {
      render(<Preloader />);
      expect(screen.getByText("Lin1er")).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("hides itself after the load timeout elapses", () => {
      render(<Preloader />);
      expect(screen.getByText("Lin1er")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.queryByText("Lin1er")).toBeNull();
    });
  });
});
