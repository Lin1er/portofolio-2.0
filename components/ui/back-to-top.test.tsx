import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BackToTop } from "./back-to-top";

describe("BackToTop", () => {
  afterEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  describe("positive case", () => {
    it("is hidden until the page is scrolled past the threshold", () => {
      render(<BackToTop />);
      expect(screen.queryByRole("button", { name: /Back to top/i })).toBeNull();
    });
  });

  describe("edge case", () => {
    it("appears after scrolling down and scrolls to top on click", () => {
      const scrollToSpy = vi
        .spyOn(window, "scrollTo")
        .mockImplementation(() => {});
      render(<BackToTop />);

      act(() => {
        Object.defineProperty(window, "scrollY", {
          value: 500,
          writable: true,
        });
        fireEvent.scroll(window);
      });

      const button = screen.getByRole("button", { name: /Back to top/i });
      fireEvent.click(button);
      expect(scrollToSpy).toHaveBeenCalledWith(
        expect.objectContaining({ top: 0 }),
      );
      scrollToSpy.mockRestore();
    });
  });
});
