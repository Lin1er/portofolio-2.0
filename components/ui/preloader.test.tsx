import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import {
  Preloader,
  WAIT_CEILING,
  finishProgress,
  waitingProgress,
  waitingSpeed,
} from "./preloader";
import { animationConfig, homeContent } from "@/data";

const { intro } = homeContent;
const t = animationConfig.intro;
/** One rAF frame or so of slack on top of a deadline. */
const SLACK = 50;
const outroMs =
  250 + t.curtainMs + t.greetingMs * (intro.greetings.length - 1) + t.holdMs + t.exitMs;

const advance = (ms: number) => act(() => vi.advanceTimersByTimeAsync(ms));
const shownPercent = () =>
  Number(screen.getByText(/^\d{3}%$/).textContent!.replace("%", ""));

function setReadyState(state: DocumentReadyState) {
  Object.defineProperty(document, "readyState", {
    configurable: true,
    get: () => state,
  });
}

describe("Preloader", () => {
  beforeEach(() => {
    sessionStorage.clear();
    delete document.documentElement.dataset.intro;
    setReadyState("complete");
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  describe("positive case", () => {
    it("shows the brand, a 000% counter and the first caption on a first visit", () => {
      render(<Preloader />);
      expect(screen.getByText(intro.name)).toBeInTheDocument();
      expect(screen.getByText("000%")).toBeInTheDocument();
      expect(screen.getByText(intro.captions[0].text)).toBeInTheDocument();
      expect(document.documentElement.dataset.intro).toBe("playing");
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("on a fast load, still holds for the minimum before reaching 100%", async () => {
      render(<Preloader />);
      await advance(t.minMs - 200);
      expect(shownPercent()).toBeLessThan(WAIT_CEILING);
      await advance(200 + t.finishMs + SLACK);
      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(screen.getByText(intro.captions.at(-1)!.text)).toBeInTheDocument();
      expect(screen.getByTestId("preloader-bar")).toHaveStyle({ width: "100%" });
    });

    it("finishes soon after a slow load completes", async () => {
      setReadyState("loading");
      render(<Preloader />);
      await advance(4000);
      expect(shownPercent()).toBeLessThan(100);
      setReadyState("complete");
      window.dispatchEvent(new Event("load"));
      await advance(t.finishMs + SLACK);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("shows each greeting in turn once the count is done", async () => {
      render(<Preloader />);
      await advance(t.minMs + t.finishMs + SLACK + 250 + t.curtainMs);
      expect(screen.getByText(intro.greetings[0])).toHaveStyle({ opacity: "1" });
      await advance(t.greetingMs);
      expect(screen.getByText(intro.greetings[1])).toHaveStyle({ opacity: "1" });
      expect(screen.getByText(intro.greetings[0])).toHaveStyle({ opacity: "0" });
    });

    it("removes itself, unlocks scroll and marks the intro done at the end", async () => {
      render(<Preloader />);
      await advance(t.minMs + t.finishMs + SLACK + outroMs + SLACK);
      expect(screen.queryByRole("status")).toBeNull();
      expect(document.body.style.overflow).toBe("");
      expect(document.documentElement.dataset.intro).toBe("done");
      expect(sessionStorage.getItem("preloader-shown")).toBe("1");
    });
  });

  describe("negative case", () => {
    it("never waits on a load that does not finish past maxMs", async () => {
      setReadyState("loading");
      render(<Preloader />);
      await advance(t.maxMs - 200);
      expect(shownPercent()).toBeLessThanOrEqual(WAIT_CEILING);
      await advance(200 + t.finishMs + SLACK);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("skips straight to done when already shown this session", async () => {
      sessionStorage.setItem("preloader-shown", "1");
      render(<Preloader />);
      await advance(0);
      expect(screen.queryByRole("status")).toBeNull();
      expect(document.documentElement.dataset.intro).toBe("done");
    });

    it("skips when the user prefers reduced motion", async () => {
      const original = window.matchMedia;
      window.matchMedia = vi.fn(() => ({ matches: true }) as MediaQueryList);
      render(<Preloader />);
      await advance(0);
      expect(screen.queryByRole("status")).toBeNull();
      window.matchMedia = original;
    });
  });

  describe("edge case", () => {
    it("can be skipped with the Skip button", () => {
      render(<Preloader />);
      fireEvent.click(screen.getByRole("button", { name: new RegExp(intro.skip) }));
      expect(screen.queryByRole("status")).toBeNull();
      expect(document.documentElement.dataset.intro).toBe("done");
    });

    it("waiting progress rises, slows down and caps at the ceiling", () => {
      expect(waitingProgress(0, 1000)).toBe(0);
      expect(waitingProgress(-5, 1000)).toBe(0);
      expect(waitingProgress(1000, 1000)).toBeCloseTo(WAIT_CEILING);
      expect(waitingProgress(9999, 1000)).toBeCloseTo(WAIT_CEILING);
      const early = waitingProgress(250, 1000) - waitingProgress(0, 1000);
      const late = waitingProgress(1000, 1000) - waitingProgress(750, 1000);
      expect(early).toBeGreaterThan(late);
    });

    it("finishes from the hand-off value to exactly 100, never going back", () => {
      const from = waitingProgress(2600, 6000);
      const speed = waitingSpeed(2600, 6000);
      expect(finishProgress(0, from, speed, 1000)).toBeCloseTo(from);
      expect(finishProgress(1, from, speed, 1000)).toBeCloseTo(100);
      expect(finishProgress(2, from, speed, 1000)).toBeCloseTo(100);
      let prev = -Infinity;
      for (let x = 0; x <= 1.0001; x += 0.05) {
        const p = finishProgress(x, from, speed, 1000);
        expect(p).toBeGreaterThanOrEqual(prev);
        expect(p).toBeLessThanOrEqual(100.0001);
        prev = p;
      }
    });

    it("hands off at the same speed instead of stalling", () => {
      const speed = waitingSpeed(2600, 6000);
      const from = waitingProgress(2600, 6000);
      const step = (finishProgress(0.001, from, speed, 1000) - from) / 1; // 1 ms
      expect(step).toBeCloseTo(speed, 2);
      expect(waitingSpeed(6000, 6000)).toBe(0);
    });
  });
});
