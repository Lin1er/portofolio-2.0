import { describe, it, expect } from "vitest";
import TwitterImage, { size, contentType } from "./twitter-image";

describe("twitter-image", () => {
  describe("positive case", () => {
    it("re-exports the opengraph image and its metadata", () => {
      expect(size).toEqual({ width: 1200, height: 630 });
      expect(contentType).toBe("image/png");
    });

    it("returns an ImageResponse built at the declared size", () => {
      const result = TwitterImage() as unknown as { options: typeof size };
      expect(result.options).toEqual(size);
    });
  });
});
