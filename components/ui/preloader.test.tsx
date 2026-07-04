import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Preloader } from "./preloader";
import { animationConfig } from "@/data";

describe("Preloader", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  describe("positive case", () => {
    it("renders the loading brand on the first visit of a session", () => {
      render(<Preloader />);
      expect(screen.getByText("Lin1er")).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("hides itself after the configured duration elapses", () => {
      render(<Preloader />);
      expect(screen.getByText("Lin1er")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(animationConfig.preloaderDuration);
      });
      expect(screen.queryByText("Lin1er")).toBeNull();
    });

    it("dismisses immediately when already shown this session", () => {
      sessionStorage.setItem("preloader-shown", "1");
      render(<Preloader />);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.queryByText("Lin1er")).toBeNull();
    });
  });
});
