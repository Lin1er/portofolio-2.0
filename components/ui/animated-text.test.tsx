import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedText } from "./animated-text";

describe("AnimatedText", () => {
  describe("positive case", () => {
    it("renders each word of the text", () => {
      render(<AnimatedText text="Hello World Foo" />);
      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.getByText("World")).toBeInTheDocument();
      expect(screen.getByText("Foo")).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("renders a single-word string", () => {
      render(<AnimatedText text="Solo" />);
      expect(screen.getByText("Solo")).toBeInTheDocument();
    });
  });
});
