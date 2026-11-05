import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./about";
import { homeContent } from "@/data";

const { manifesto } = homeContent;

describe("AboutSection", () => {
  describe("positive case", () => {
    it("renders the #about anchor with the manifesto text", () => {
      const { container } = render(<AboutSection />);
      const section = container.querySelector("#about")!;
      expect(section).not.toBeNull();
      expect(section.querySelector("p")).toHaveTextContent(manifesto.text);
    });

    it("renders every note", () => {
      render(<AboutSection />);
      for (const note of manifesto.notes) {
        expect(screen.getByText(note.title)).toBeInTheDocument();
        expect(screen.getByText(note.body)).toBeInTheDocument();
      }
    });
  });

  describe("edge case", () => {
    it("keeps the decorative tapes out of the accessibility tree", () => {
      const { container } = render(<AboutSection />);
      const tapes = container.querySelectorAll('[aria-hidden="true"] [data-testid="ticker-track"]');
      expect(tapes).toHaveLength(2);
    });
  });
});
