import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoCard } from "./bento-card";

describe("BentoCard", () => {
  describe("positive case", () => {
    it("renders its children", () => {
      render(<BentoCard>card body</BentoCard>);
      expect(screen.getByText("card body")).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("applies the responsive column-span class for colSpan=2", () => {
      const { container } = render(<BentoCard colSpan={2}>x</BentoCard>);
      const el = container.firstElementChild as HTMLElement;
      expect(el.className).toContain("md:col-span-2");
    });

    it("forwards a custom className", () => {
      const { container } = render(
        <BentoCard className="my-card">x</BentoCard>,
      );
      expect((container.firstElementChild as HTMLElement).className).toContain(
        "my-card",
      );
    });
  });
});
