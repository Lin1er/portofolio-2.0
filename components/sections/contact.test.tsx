import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactSection } from "./contact";

function fill() {
  // fireEvent.change sets the full value in one event, which is deterministic
  // for React controlled inputs (avoids per-keystroke state races).
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Jane" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: "Hello there" },
  });
}

function submit() {
  const form = screen
    .getByRole("button", { name: /send message/i })
    .closest("form")!;
  fireEvent.submit(form);
}

describe("ContactSection", () => {
  describe("positive case", () => {
    it("renders the heading and form fields", () => {
      render(<ContactSection />);
      expect(
        screen.getByRole("heading", { name: /Connect/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it("posts the form data to /api/contact and shows success", async () => {
      const fetchMock = vi.fn(() =>
        Promise.resolve({ ok: true, status: 200 } as Response),
      );
      global.fetch = fetchMock;

      render(<ContactSection />);
      fill();
      submit();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe("/api/contact");
      expect(init?.method).toBe("POST");
      const body = JSON.parse((init as RequestInit).body as string);
      expect(body).toMatchObject({
        name: "Jane",
        email: "jane@example.com",
        message: "Hello there",
      });
      expect(
        await screen.findByText(/Message sent successfully/i),
      ).toBeInTheDocument();
    });
  });

  describe("negative case", () => {
    it("shows an error message when the API responds not-ok", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: false, status: 500 } as Response),
      );
      render(<ContactSection />);
      fill();
      submit();
      expect(
        await screen.findByText(/Failed to send message/i),
      ).toBeInTheDocument();
    });

    it("shows an error message when the request throws", async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error("network down")));
      render(<ContactSection />);
      fill();
      submit();
      expect(
        await screen.findByText(/Failed to send message/i),
      ).toBeInTheDocument();
    });
  });

  describe("edge case", () => {
    it("silently short-circuits (no fetch) when the honeypot is filled", async () => {
      const fetchMock = vi.fn(() =>
        Promise.resolve({ ok: true, status: 200 } as Response),
      );
      global.fetch = fetchMock;

      const { container } = render(<ContactSection />);
      const honeypot = container.querySelector(
        'input[name="website"]',
      ) as HTMLInputElement;
      fireEvent.change(honeypot, { target: { value: "spam-bot" } });
      fill();
      submit();

      expect(fetchMock).not.toHaveBeenCalled();
      expect(
        await screen.findByText(/Message sent successfully/i),
      ).toBeInTheDocument();
    });
  });
});
