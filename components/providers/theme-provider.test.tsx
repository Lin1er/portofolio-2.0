import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  describe("positive case", () => {
    it("renders its children", () => {
      render(
        <ThemeProvider>
          <span>themed child</span>
        </ThemeProvider>,
      );
      expect(screen.getByText("themed child")).toBeInTheDocument();
    });
  });
});
