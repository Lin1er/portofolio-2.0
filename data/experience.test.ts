import { describe, it, expect } from "vitest";
import { experiences } from "./experience";

const VALID_TYPE = ["education", "work", "achievement", "organization"];
const VALID_ICON = ["graduation", "briefcase", "award", "calendar", "users"];

describe("experiences", () => {
  describe("positive case", () => {
    it("is a non-empty array with required fields", () => {
      expect(experiences.length).toBeGreaterThan(0);
      for (const e of experiences) {
        expect(e.title.length).toBeGreaterThan(0);
        expect(e.organization.length).toBeGreaterThan(0);
        expect(e.period.length).toBeGreaterThan(0);
        expect(e.description.length).toBeGreaterThan(0);
      }
    });
  });

  describe("negative case", () => {
    it("uses only type values in the Experience union", () => {
      for (const e of experiences) {
        expect(VALID_TYPE).toContain(e.type);
      }
    });

    it("uses only icon values in the Experience union (they map to lucide icons)", () => {
      for (const e of experiences) {
        expect(VALID_ICON).toContain(e.icon);
      }
    });
  });

  describe("edge case", () => {
    it("keeps image as a non-empty string when provided", () => {
      for (const e of experiences) {
        if (e.image !== undefined) {
          expect(typeof e.image).toBe("string");
          expect(e.image.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
