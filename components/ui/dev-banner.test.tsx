import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { DevBanner } from "./dev-banner";

describe("DevBanner", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  describe("positive case", () => {
    it("renders the under-development banner initially", () => {
      render(<DevBanner />);
      expect(screen.getAllByText(/Under Development/i).length).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("hides the banner after the timeout elapses", () => {
      render(<DevBanner />);
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(screen.queryByText(/Under Development/i)).toBeNull();
    });
  });
});
