import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClientEmail } from "./client";

describe("ClientEmail", () => {
  describe("positive case", () => {
    it("renders the sender name, email, and message", () => {
      render(
        <ClientEmail
          clientName="Jane Doe"
          clientEmail="jane@example.com"
          message="I would like to collaborate."
        />,
      );
      expect(screen.getByText(/New Message from Jane Doe/i)).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      expect(
        screen.getByText("I would like to collaborate."),
      ).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("still renders structure when the message is empty", () => {
      const { container } = render(
        <ClientEmail clientName="A" clientEmail="a@b.com" message="" />,
      );
      expect(container.querySelector("h2")).not.toBeNull();
    });
  });
});
