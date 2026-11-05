import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Topbar } from "./topbar";
import { homeContent, navItems } from "@/data";

const { topbar } = homeContent;
const menuButton = () =>
  screen.getByRole("button", { name: new RegExp(topbar.menu, "i") });

describe("Topbar", () => {
  describe("positive case", () => {
    it("renders the logo, role and availability", () => {
      render(<Topbar />);
      expect(screen.getByRole("link", { name: topbar.logo })).toHaveAttribute("href", "/");
      expect(screen.getByText(topbar.role)).toBeInTheDocument();
      expect(screen.getByText(topbar.status)).toBeInTheDocument();
    });

    it("opens the menu with every nav item", () => {
      render(<Topbar />);
      fireEvent.click(menuButton());
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      for (const item of navItems) {
        expect(screen.getByRole("link", { name: new RegExp(item.name) }))
          .toHaveAttribute("href", item.href);
      }
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  describe("negative case", () => {
    it("starts closed", () => {
      render(<Topbar />);
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("navigation")).toBeNull();
    });
  });

  describe("edge case", () => {
    it("closes on Escape and on picking a link, unlocking scroll", () => {
      render(<Topbar />);
      fireEvent.click(menuButton());
      fireEvent.keyDown(window, { key: "Escape" });
      expect(screen.queryByRole("navigation")).toBeNull();
      expect(document.body.style.overflow).toBe("");

      fireEvent.click(menuButton());
      fireEvent.keyDown(window, { key: "a" });
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("link", { name: new RegExp(navItems[0].name) }));
      expect(screen.queryByRole("navigation")).toBeNull();
    });
  });
});
