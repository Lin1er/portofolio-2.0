import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "./not-found";

describe("NotFound", () => {
  describe("positive case", () => {
    it("renders the 404 heading and not-found copy", () => {
      render(<NotFound />);
      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });

    it("offers a link back to the home page", () => {
      render(<NotFound />);
      const home = screen.getByRole("link", { name: /Go Home/i });
      expect(home).toHaveAttribute("href", "/");
    });
  });

  describe("edge case", () => {
    it("calls window.history.back when Go Back is clicked", async () => {
      const backSpy = vi.spyOn(window.history, "back").mockImplementation(
        () => {},
      );
      render(<NotFound />);
      await userEvent.click(screen.getByRole("button", { name: /Go Back/i }));
      expect(backSpy).toHaveBeenCalledTimes(1);
      backSpy.mockRestore();
    });
  });
});
