import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "./projects";
import { projects, socialLinks } from "@/data";

describe("ProjectsSection", () => {
  describe("positive case", () => {
    it("renders the projects section anchor", () => {
      const { container } = render(<ProjectsSection />);
      expect(container.querySelector("#projects")).not.toBeNull();
    });

    it("renders a card per project by default (filter = all)", () => {
      render(<ProjectsSection />);
      // Each card is a button labelled "View details for <title>".
      const cards = screen
        .getAllByRole("button")
        .filter((b) =>
          b.getAttribute("aria-label")?.startsWith("View details for"),
        );
      expect(cards.length).toBe(projects.length);
    });

    it("links to the GitHub profile in the footer CTA", () => {
      render(<ProjectsSection />);
      const githubHref = socialLinks.find((l) => l.name === "GitHub")!.href;
      const cta = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === githubHref);
      expect(cta.length).toBeGreaterThan(0);
    });
  });

  describe("edge case", () => {
    it("filters the visible cards when a category is selected", async () => {
      render(<ProjectsSection />);
      const backend = projects.filter((p) => p.category === "backend");
      const web3 = projects.filter((p) => p.category === "web3");
      // Preconditions so the assertion is meaningful.
      expect(backend.length).toBeGreaterThan(0);
      expect(web3.length).toBeGreaterThan(0);

      await userEvent.click(screen.getByRole("button", { name: /^Backend/i }));

      // A backend project stays; a web3 project disappears.
      expect(
        screen.getByLabelText(`View details for ${backend[0].title}`),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText(`View details for ${web3[0].title}`),
      ).toBeNull();
    });

    it("opens the project detail modal when a card is clicked", async () => {
      render(<ProjectsSection />);
      expect(screen.queryByRole("dialog")).toBeNull();

      await userEvent.click(
        screen.getByLabelText(`View details for ${projects[0].title}`),
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
