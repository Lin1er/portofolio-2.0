import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  describe("positive case", () => {
    it("renders a labelled toggle button after mount", () => {
      render(<ThemeToggle />);
      expect(
        screen.getByRole("button", { name: /Toggle theme/i }),
      ).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("switches from dark to light when clicked", async () => {
      // next-themes is mocked; useTheme() returns a stable object with a spy.
      const { setTheme } = useTheme();
      render(<ThemeToggle />);
      await userEvent.click(
        screen.getByRole("button", { name: /Toggle theme/i }),
      );
      expect(setTheme).toHaveBeenCalledWith("light");
    });
  });
});
