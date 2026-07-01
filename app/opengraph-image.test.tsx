import { describe, it, expect } from "vitest";
import OpengraphImage, { size, alt, contentType } from "./opengraph-image";
import { siteConfig } from "@/data";

describe("opengraph-image", () => {
  describe("positive case", () => {
    it("exports the OG image metadata (1200x630 png)", () => {
      expect(size).toEqual({ width: 1200, height: 630 });
      expect(contentType).toBe("image/png");
      expect(alt).toBe(siteConfig.title);
    });

    it("returns an ImageResponse built at the declared size", () => {
      // next/og ImageResponse is mocked in vitest.setup.ts to record options.
      const result = OpengraphImage() as unknown as { options: typeof size };
      expect(result).toBeTruthy();
      expect(result.options).toEqual(size);
    });
  });
});
