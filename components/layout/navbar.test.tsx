import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./navbar";
import { navItems, personalInfo } from "@/data";

describe("Navbar", () => {
  describe("positive case", () => {
    it("renders the brand name and a link per nav item", () => {
      render(<Navbar />);
      expect(
        screen.getAllByText(new RegExp(personalInfo.name, "i")).length,
      ).toBeGreaterThan(0);
      for (const item of navItems) {
        const links = screen
          .getAllByRole("link")
          .filter((a) => a.getAttribute("href") === item.href);
        expect(links.length).toBeGreaterThan(0);
      }
    });

    it("exposes a contact CTA", () => {
      render(<Navbar />);
      expect(screen.getAllByText(/Let's Talk/i).length).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("opens the mobile menu when the toggle is clicked", async () => {
      render(<Navbar />);
      const firstItem = navItems[0];
      const before = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === firstItem.href).length;

      await userEvent.click(
        screen.getByRole("button", { name: /Toggle menu/i }),
      );

      const after = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === firstItem.href).length;
      // Mobile overlay duplicates the nav links, so the count grows.
      expect(after).toBeGreaterThan(before);
    });
  });
});
