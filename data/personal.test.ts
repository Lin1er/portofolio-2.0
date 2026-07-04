import { describe, it, expect } from "vitest";
import {
  personalInfo,
  socialLinks,
  navItems,
  funFacts,
} from "./personal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;

describe("personalInfo", () => {
  describe("positive case", () => {
    it("exposes non-empty core identity fields", () => {
      expect(personalInfo.name.length).toBeGreaterThan(0);
      expect(personalInfo.role.length).toBeGreaterThan(0);
      expect(personalInfo.bio.length).toBeGreaterThan(0);
    });
  });

  describe("negative case", () => {
    it("has an email that matches an email shape", () => {
      expect(personalInfo.email).toMatch(EMAIL_RE);
    });

    it("has a non-negative years of experience", () => {
      expect(personalInfo.yearsOfExperience).toBeGreaterThanOrEqual(0);
    });
  });
});

describe("socialLinks", () => {
  describe("negative case", () => {
    it("gives every social link a name and an http(s) href", () => {
      expect(socialLinks.length).toBeGreaterThan(0);
      for (const link of socialLinks) {
        expect(link.name.length).toBeGreaterThan(0);
        expect(link.href).toMatch(URL_RE);
      }
    });
  });
});

describe("navItems", () => {
  describe("negative case", () => {
    it("gives every nav item a name and a href", () => {
      expect(navItems.length).toBeGreaterThan(0);
      for (const item of navItems) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.href.length).toBeGreaterThan(0);
      }
    });
  });

  describe("edge case", () => {
    it("points anchor hrefs at in-page sections", () => {
      const anchors = navItems.filter((i) => i.href.includes("#"));
      expect(anchors.length).toBeGreaterThan(0);
      for (const item of anchors) {
        expect(item.href).toMatch(/#[a-z-]+$/);
      }
    });
  });
});

describe("funFacts", () => {
  describe("positive case", () => {
    it("is a non-empty array", () => {
      expect(funFacts.length).toBeGreaterThan(0);
    });
  });

  describe("negative case", () => {
    it("gives every fun fact an emoji and a label", () => {
      for (const fact of funFacts) {
        expect(fact.emoji.length).toBeGreaterThan(0);
        expect(fact.label.length).toBeGreaterThan(0);
      }
    });
  });
});
