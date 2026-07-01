import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { personalInfo, socialLinks, navItems } from "@/data";

describe("Footer", () => {
  describe("positive case", () => {
    it("renders the brand, bio, and a mailto link", () => {
      render(<Footer />);
      expect(
        screen.getAllByText(new RegExp(personalInfo.name, "i")).length,
      ).toBeGreaterThan(0);
      const mail = screen
        .getAllByRole("link")
        .filter((a) =>
          a.getAttribute("href") === `mailto:${personalInfo.email}`,
        );
      expect(mail.length).toBeGreaterThan(0);
    });

    it("renders a link per nav item and a labelled social link per social", () => {
      render(<Footer />);
      for (const item of navItems) {
        const links = screen
          .getAllByRole("link")
          .filter((a) => a.getAttribute("href") === item.href);
        expect(links.length).toBeGreaterThan(0);
      }
      for (const social of socialLinks) {
        expect(
          screen.getByRole("link", { name: social.name }),
        ).toHaveAttribute("href", social.href);
      }
    });
  });

  describe("edge case", () => {
    it("shows the current-year copyright and no 'Made with' text", () => {
      render(<Footer />);
      const year = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
      expect(screen.queryByText(/Made with/i)).toBeNull();
    });
  });
});
