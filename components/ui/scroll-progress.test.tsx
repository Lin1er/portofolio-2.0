import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ScrollProgress } from "./scroll-progress";

describe("ScrollProgress", () => {
  describe("positive case", () => {
    it("renders a fixed progress bar element", () => {
      const { container } = render(<ScrollProgress />);
      const bar = container.firstElementChild as HTMLElement;
      expect(bar).not.toBeNull();
      expect(bar.className).toContain("fixed");
    });
  });
});
