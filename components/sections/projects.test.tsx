import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectsSection, projectHref } from "./projects";
import { homeContent, projects, siteConfig, type Project } from "@/data";

const { work } = homeContent;
const base: Project = projects[0];

describe("ProjectsSection", () => {
  describe("positive case", () => {
    it("renders the #projects anchor and the SHIPPED. title", () => {
      const { container } = render(<ProjectsSection />);
      expect(container.querySelector("#projects")).not.toBeNull();
      expect(screen.getByRole("heading", { name: work.title })).toBeInTheDocument();
    });

    it("renders the curated rows in order, capped by the homepage limit", () => {
      render(<ProjectsSection />);
      const rows = within(screen.getByRole("list")).getAllByRole("listitem");
      const expected = work.entries.slice(0, siteConfig.homepage.projectsLimit);
      expect(rows).toHaveLength(expected.length);
      expected.forEach((title, i) => expect(rows[i]).toHaveTextContent(title));
    });

    it("links to the full projects page", () => {
      render(<ProjectsSection />);
      expect(screen.getByRole("link", { name: new RegExp(work.more.label, "i") }))
        .toHaveAttribute("href", work.more.href);
    });
  });

  describe("negative case", () => {
    it("every curated title exists in projects", () => {
      for (const title of work.entries) {
        expect(projects.some((p) => p.title === title)).toBe(true);
      }
    });

    it("opens external rows in a new tab safely", () => {
      render(<ProjectsSection />);
      for (const link of screen.getAllByRole("link")) {
        if (link.getAttribute("href")?.startsWith("http")) {
          expect(link).toHaveAttribute("target", "_blank");
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
      }
    });
  });

  describe("edge case", () => {
    it("prefers case study, then live, then GitHub, then /projects", () => {
      const p = { ...base, caseStudySlug: undefined, live: undefined, github: undefined };
      expect(projectHref({ ...p, caseStudySlug: "x", live: "https://l" })).toBe("/projects/x");
      expect(projectHref({ ...p, live: "https://l", github: "https://g" })).toBe("https://l");
      expect(projectHref({ ...p, github: "https://g" })).toBe("https://g");
      expect(projectHref(p)).toBe("/projects");
    });
  });
});
