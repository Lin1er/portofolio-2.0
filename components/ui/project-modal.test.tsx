import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectModal } from "./project-modal";
import type { Project } from "@/data";

const project: Project = {
  title: "Test Project",
  description: "A description of the test project.",
  image: "/assets/test.png",
  tags: ["Next.js", "TypeScript"],
  github: "https://github.com/example/test",
  live: "https://test.example.com",
  status: "completed",
  category: "web3",
};

describe("ProjectModal", () => {
  describe("positive case", () => {
    it("renders the project details in a dialog when a project is passed", () => {
      render(<ProjectModal project={project} onClose={vi.fn()} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", async () => {
      const onClose = vi.fn();
      render(<ProjectModal project={project} onClose={onClose} />);
      await userEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("negative case", () => {
    it("renders nothing when project is null", () => {
      const { container } = render(
        <ProjectModal project={null} onClose={vi.fn()} />,
      );
      expect(container.querySelector('[role="dialog"]')).toBeNull();
    });
  });

  describe("edge case", () => {
    it("calls onClose when Escape is pressed", () => {
      const onClose = vi.fn();
      render(<ProjectModal project={project} onClose={onClose} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalled();
    });
  });
});
