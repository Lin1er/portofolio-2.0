import { describe, it, expect } from "vitest";
import {
  skills,
  skillCategories,
  techStackRow1,
  techStackRow2,
  techStackRow3,
} from "./skills";

describe("skills", () => {
  describe("positive case", () => {
    it("exposes a category for each declared skill category id", () => {
      for (const category of skillCategories) {
        expect(skills).toHaveProperty(category.id);
      }
    });
  });

  describe("negative case", () => {
    it("keeps every skill level within 0..100", () => {
      for (const list of Object.values(skills)) {
        for (const skill of list) {
          expect(skill.name.length).toBeGreaterThan(0);
          expect(skill.level).toBeGreaterThanOrEqual(0);
          expect(skill.level).toBeLessThanOrEqual(100);
        }
      }
    });
  });

  describe("edge case", () => {
    it("keeps each marquee row non-empty with named entries", () => {
      for (const row of [techStackRow1, techStackRow2, techStackRow3]) {
        expect(row.length).toBeGreaterThan(0);
        for (const item of row) {
          expect(item.name.length).toBeGreaterThan(0);
          expect(item.icon.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
