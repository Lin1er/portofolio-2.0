import { describe, it, expect, vi, beforeEach } from "vitest";
import { personalInfo } from "@/data";

// Local, controllable Resend mock (a single shared send spy).
const sendMock = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

// Avoid rendering the real email component during the route call.
vi.mock("@/components/email-templates/client", () => ({
  ClientEmail: vi.fn(() => null),
}));

import { POST } from "./route";

/**
 * Build a minimal NextRequest-like object exposing json() and headers.
 * Each call gets a unique client IP by default so the route's per-IP rate
 * limiter never couples unrelated tests; pass opts.ip to share one.
 */
let ipCounter = 0;
function makeRequest(
  body: unknown,
  opts: { throwOnJson?: boolean; ip?: string } = {},
) {
  const ip = opts.ip ?? `10.0.0.${++ipCounter}`;
  return {
    headers: new Headers({ "x-forwarded-for": ip }),
    json: opts.throwOnJson
      ? vi.fn(() => Promise.reject(new SyntaxError("Unexpected token")))
      : vi.fn(() => Promise.resolve(body)),
  } as unknown as import("next/server").NextRequest;
}

const validBody = {
  name: "Jane",
  email: "jane@example.com",
  message: "Hello there",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  describe("positive case", () => {
    it("sends the email and returns 200 with success payload", async () => {
      sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });

      const res = await POST(makeRequest(validBody));
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json).toEqual({ success: true, data: { id: "email_1" } });
      expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it("addresses the email to the owner and sets replyTo to the sender", async () => {
      sendMock.mockResolvedValue({ data: { id: "x" }, error: null });

      await POST(makeRequest(validBody));

      const payload = sendMock.mock.calls[0][0];
      expect(payload.to).toBe(personalInfo.email);
      expect(payload.replyTo).toBe(validBody.email);
      expect(payload.subject).toContain(validBody.name);
    });
  });

  describe("negative case", () => {
    it("returns 400 when name is missing", async () => {
      const res = await POST(makeRequest({ email: "a@b.com", message: "hi" }));
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toBe("All fields are required");
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 400 when email is missing", async () => {
      const res = await POST(makeRequest({ name: "Jane", message: "hi" }));
      expect(res.status).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 400 when message is missing", async () => {
      const res = await POST(makeRequest({ name: "Jane", email: "a@b.com" }));
      expect(res.status).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 400 when a field is an empty string (falsy)", async () => {
      const res = await POST(
        makeRequest({ name: "", email: "a@b.com", message: "hi" }),
      );
      expect(res.status).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 400 when the email is not a valid address", async () => {
      const res = await POST(
        makeRequest({ name: "Jane", email: "not-an-email", message: "hi" }),
      );
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toBe("Please provide a valid email address");
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 400 when a field exceeds its maximum length", async () => {
      const res = await POST(
        makeRequest({
          name: "J".repeat(101),
          email: "jane@example.com",
          message: "hi",
        }),
      );
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toBe("Input exceeds maximum length");
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 500 when Resend reports an error", async () => {
      sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });

      const res = await POST(makeRequest(validBody));
      const json = await res.json();
      expect(res.status).toBe(500);
      expect(json.error).toBe("Failed to send email");
    });

    it("returns 500 when the request body is malformed JSON", async () => {
      const res = await POST(makeRequest(null, { throwOnJson: true }));
      const json = await res.json();
      expect(res.status).toBe(500);
      expect(json.error).toBe("Internal server error");
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe("edge case", () => {
    it("rejects whitespace-only fields", async () => {
      sendMock.mockResolvedValue({ data: { id: "x" }, error: null });

      const res = await POST(
        makeRequest({ name: "   ", email: "   ", message: "   " }),
      );
      expect(res.status).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("ignores unexpected extra fields in the body", async () => {
      sendMock.mockResolvedValue({ data: { id: "x" }, error: null });

      const res = await POST(
        makeRequest({ ...validBody, extra: "ignored", role: "admin" }),
      );
      expect(res.status).toBe(200);
      expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it("fakes success without sending when the honeypot is filled", async () => {
      const res = await POST(
        makeRequest({ ...validBody, honeypot: "https://spam.example" }),
      );
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json).toEqual({ success: true });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns 429 once an IP exceeds the rate limit", async () => {
      sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
      const ip = "203.0.113.7";

      for (let i = 0; i < 5; i++) {
        const res = await POST(makeRequest(validBody, { ip }));
        expect(res.status).toBe(200);
      }

      const res = await POST(makeRequest(validBody, { ip }));
      const json = await res.json();
      expect(res.status).toBe(429);
      expect(json.error).toBe("Too many requests. Please try again later.");
      expect(sendMock).toHaveBeenCalledTimes(5);
    });
  });
});
