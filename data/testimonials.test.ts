import { describe, it, expect } from "vitest";
import { testimonials } from "./testimonials";

describe("testimonials", () => {
  describe("positive case", () => {
    it("is a non-empty array with required fields", () => {
      expect(testimonials.length).toBeGreaterThan(0);
      for (const t of testimonials) {
        expect(t.name.length).toBeGreaterThan(0);
        expect(t.role.length).toBeGreaterThan(0);
        expect(t.company.length).toBeGreaterThan(0);
        expect(t.content.length).toBeGreaterThan(0);
      }
    });
  });

  describe("negative case", () => {
    it("keeps every rating an integer within 1..5", () => {
      for (const t of testimonials) {
        expect(Number.isInteger(t.rating)).toBe(true);
        expect(t.rating).toBeGreaterThanOrEqual(1);
        expect(t.rating).toBeLessThanOrEqual(5);
      }
    });
  });

  describe("edge case", () => {
    it("keeps image as a non-empty string when provided", () => {
      for (const t of testimonials) {
        if (t.image !== undefined) {
          expect(typeof t.image).toBe("string");
          expect(t.image.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
