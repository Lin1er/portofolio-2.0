import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { personalInfo } from "@/data";

describe("Home page", () => {
  describe("positive case", () => {
    it("renders the main landmark", () => {
      const { container } = render(<Home />);
      expect(container.querySelector("main")).not.toBeNull();
    });

    it("renders the owner's name somewhere on the page", () => {
      render(<Home />);
      expect(screen.getAllByText(new RegExp(personalInfo.name, "i")).length)
        .toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("renders section anchor ids used by nav links", () => {
      const { container } = render(<Home />);
      expect(container.querySelector("#about")).not.toBeNull();
      expect(container.querySelector("#projects")).not.toBeNull();
      expect(container.querySelector("#contact")).not.toBeNull();
    });
  });
});
