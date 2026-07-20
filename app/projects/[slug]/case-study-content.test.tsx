import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyContent } from "./case-study-content";
import { caseStudies, projects } from "@/data";

const caseStudy = caseStudies[0];
const project = projects.find((p) => p.title === caseStudy.projectTitle);

describe("CaseStudyContent", () => {
  describe("positive case", () => {
    it("renders the headline, summary, problem and build narrative", () => {
      render(<CaseStudyContent caseStudy={caseStudy} project={project} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        caseStudy.projectTitle,
      );
      expect(screen.getByText(caseStudy.headline)).toBeInTheDocument();
      expect(screen.getByText(caseStudy.summary)).toBeInTheDocument();
      expect(screen.getByText(caseStudy.problem)).toBeInTheDocument();
      expect(screen.getByText(caseStudy.build)).toBeInTheDocument();
    });

    it("renders every architecture node and highlight", () => {
      render(<CaseStudyContent caseStudy={caseStudy} project={project} />);
      for (const node of caseStudy.architecture) {
        // node.label may also appear as a Stack row layer, so allow duplicates.
        expect(screen.getAllByText(node.label).length).toBeGreaterThan(0);
        expect(screen.getByText(node.role)).toBeInTheDocument();
      }
      for (const h of caseStudy.highlights) {
        expect(screen.getByText(h)).toBeInTheDocument();
      }
    });

    it("links to the live app and source with external anchors", () => {
      render(<CaseStudyContent caseStudy={caseStudy} project={project} />);
      for (const link of caseStudy.links) {
        const anchor = screen.getByRole("link", { name: link.label });
        expect(anchor).toHaveAttribute("href", link.href);
        expect(anchor).toHaveAttribute("target", "_blank");
      }
    });
  });

  describe("edge case", () => {
    it("still renders without a linked project (no cover image, no category)", () => {
      render(<CaseStudyContent caseStudy={caseStudy} />);
      expect(screen.getByText(caseStudy.headline)).toBeInTheDocument();
      expect(screen.queryByRole("img")).toBeNull();
    });

    it("shows the deployed contract address when present", () => {
      render(<CaseStudyContent caseStudy={caseStudy} project={project} />);
      if (caseStudy.contractAddress) {
        expect(screen.getByText(caseStudy.contractAddress)).toBeInTheDocument();
      }
    });
  });
});
