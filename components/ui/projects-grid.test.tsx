import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsGrid } from "./projects-grid";
import type { Project } from "@/data";

const makeProject = (overrides: Partial<Project>): Project => ({
  title: "Fixture",
  description: "A fixture project",
  image: "/assets/fixture.png",
  tags: ["TypeScript"],
  category: "backend",
  ...overrides,
});

const items: Project[] = [
  makeProject({ title: "Backend Thing", category: "backend" }),
  makeProject({ title: "Chain Thing", category: "web3" }),
];

describe("ProjectsGrid", () => {
  describe("positive case", () => {
    it("renders a card per item", () => {
      render(<ProjectsGrid items={items} />);
      const cards = screen
        .getAllByRole("button")
        .filter((b) =>
          b.getAttribute("aria-label")?.startsWith("View details for"),
        );
      expect(cards.length).toBe(items.length);
    });

    it("hides the category filters unless showFilters is set", () => {
      render(<ProjectsGrid items={items} />);
      expect(screen.queryByRole("button", { name: /^Backend/i })).toBeNull();
    });
  });

  describe("edge case", () => {
    it("filters the visible cards when a category is selected", async () => {
      render(<ProjectsGrid items={items} showFilters />);

      await userEvent.click(screen.getByRole("button", { name: /^Backend/i }));

      expect(
        screen.getByLabelText("View details for Backend Thing"),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText("View details for Chain Thing"),
      ).toBeNull();
    });

    it("shows the empty state when a category has no projects", async () => {
      render(<ProjectsGrid items={items} showFilters />);

      await userEvent.click(screen.getByRole("button", { name: /^Frontend/i }));

      expect(
        screen.getByText(/No projects found in this category yet/i),
      ).toBeInTheDocument();
    });

    it("opens the detail modal when a card is clicked", async () => {
      render(<ProjectsGrid items={items} />);
      expect(screen.queryByRole("dialog")).toBeNull();

      await userEvent.click(
        screen.getByLabelText("View details for Backend Thing"),
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
