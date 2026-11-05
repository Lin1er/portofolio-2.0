import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { SkillsSection } from "./skills";
import { homeContent } from "@/data";

const { tools } = homeContent;

describe("SkillsSection", () => {
  describe("positive case", () => {
    it("renders the #skills anchor and every tool with its category", () => {
      const { container } = render(<SkillsSection />);
      expect(container.querySelector("#skills")).not.toBeNull();
      const cells = within(screen.getByRole("list")).getAllByRole("listitem");
      expect(cells).toHaveLength(tools.items.length);
      tools.items.forEach((tool, i) => {
        expect(cells[i]).toHaveTextContent(tool.name);
        expect(cells[i]).toHaveTextContent(tool.category);
      });
    });
  });

  describe("edge case", () => {
    it("highlights only the flagged tools", () => {
      render(<SkillsSection />);
      const cells = within(screen.getByRole("list")).getAllByRole("listitem");
      tools.items.forEach((tool, i) => {
        expect(cells[i].className.includes("bg-accent")).toBe(Boolean(tool.highlight));
      });
    });
  });
});
