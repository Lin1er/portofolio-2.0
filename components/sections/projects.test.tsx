import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "./projects";
import { projects, siteConfig, socialLinks } from "@/data";

const featured = projects
  .filter((p) => p.featured)
  .slice(0, siteConfig.homepage.projectsLimit);

describe("ProjectsSection", () => {
  describe("positive case", () => {
    it("renders the projects section anchor", () => {
      const { container } = render(<ProjectsSection />);
      expect(container.querySelector("#projects")).not.toBeNull();
    });

    it("renders only the featured projects capped by the homepage limit", () => {
      render(<ProjectsSection />);
      // Each card is a button labelled "View details for <title>".
      const cards = screen
        .getAllByRole("button")
        .filter((b) =>
          b.getAttribute("aria-label")?.startsWith("View details for"),
        );
      expect(cards.length).toBe(featured.length);
      expect(cards.length).toBeLessThanOrEqual(
        siteConfig.homepage.projectsLimit,
      );
    });

    it("links to the /projects page for the full list", () => {
      render(<ProjectsSection />);
      const viewAll = screen.getByRole("link", { name: /View All Projects/i });
      expect(viewAll).toHaveAttribute("href", "/projects");
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
    it("opens the project detail modal when a card is clicked", async () => {
      render(<ProjectsSection />);
      expect(screen.queryByRole("dialog")).toBeNull();

      await userEvent.click(
        screen.getByLabelText(`View details for ${featured[0].title}`),
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
