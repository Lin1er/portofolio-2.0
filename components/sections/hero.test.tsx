import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./hero";
import { homeContent, personalInfo } from "@/data";

const { hero, stats } = homeContent;

describe("HeroSection", () => {
  describe("positive case", () => {
    it("renders the giant name with the accent letter", () => {
      render(<HeroSection />);
      const name = screen.getByTestId("hero-name");
      expect(name).toHaveTextContent(hero.nameMain + hero.nameAccent);
    });

    it("exposes the full name and role as the page heading", () => {
      render(<HeroSection />);
      expect(
        screen.getByRole("heading", { level: 1, name: new RegExp(personalInfo.name) }),
      ).toBeInTheDocument();
    });

    it("renders the statement, body and every stat", () => {
      render(<HeroSection />);
      expect(screen.getByText(hero.headline)).toBeInTheDocument();
      expect(screen.getByText(hero.body)).toBeInTheDocument();
      for (const stat of stats) {
        expect(screen.getByText(stat.value)).toBeInTheDocument();
        expect(screen.getByText(stat.label)).toBeInTheDocument();
      }
    });
  });

  describe("negative case", () => {
    it("links the CTAs to the work list and the résumé (opened safely)", () => {
      render(<HeroSection />);
      expect(screen.getByRole("link", { name: new RegExp(hero.primaryCta.label, "i") }))
        .toHaveAttribute("href", hero.primaryCta.href);
      const resume = screen.getByRole("link", {
        name: new RegExp(hero.secondaryCta.label, "i"),
      });
      expect(resume).toHaveAttribute("href", personalInfo.resumeUrl);
      expect(resume).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("edge case", () => {
    it("hides the decorative name from assistive tech (the h1 carries it)", () => {
      render(<HeroSection />);
      expect(screen.getByTestId("hero-name")).toHaveAttribute("aria-hidden", "true");
    });
  });
});
