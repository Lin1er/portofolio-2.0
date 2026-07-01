import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./hero";
import { personalInfo } from "@/data";

describe("HeroSection", () => {
  describe("positive case", () => {
    it("renders the role and bio from personalInfo", () => {
      render(<HeroSection />);
      expect(screen.getByText(personalInfo.role)).toBeInTheDocument();
      expect(screen.getByText(personalInfo.bio)).toBeInTheDocument();
    });

    it("links to the resume", () => {
      render(<HeroSection />);
      const resume = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === personalInfo.resumeUrl);
      expect(resume.length).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("renders the availability badge text", () => {
      render(<HeroSection />);
      expect(
        screen.getByText(new RegExp(personalInfo.availability, "i")),
      ).toBeInTheDocument();
    });
  });
});
