"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animationConfig, homeContent } from "@/data";
import { INTRO_SESSION_KEY as SESSION_KEY } from "@/components/ui/intro-gate";

/** `<html data-intro>`: "playing" hides the hero name, "done" slides it in. */
function setIntroState(state: "playing" | "done") {
  document.documentElement.dataset.intro = state;
}

type Phase = "count" | "curtain" | "greet" | "exit" | "done";

/** Highest percent the counter reaches while still waiting for the page. */
export const WAIT_CEILING = 92;

/**
 * Percent shown while the page is still loading: climbs quickly at first,
 * then slows down and settles at `WAIT_CEILING` by `maxMs`.
 */
export function waitingProgress(elapsed: number, maxMs: number) {
  const t = Math.min(1, Math.max(0, elapsed / maxMs));
  return WAIT_CEILING * (1 - Math.pow(1 - t, 3));
}

/** Speed (percent per ms) of `waitingProgress` at `elapsed`. */
export function waitingSpeed(elapsed: number, maxMs: number) {
  const t = Math.min(1, Math.max(0, elapsed / maxMs));
  return (3 * WAIT_CEILING * Math.pow(1 - t, 2)) / maxMs;
}

/**
 * Finishing stretch from `from` to 100 over `duration` ms. It starts at the
 * speed the waiting curve had (`speed`, percent per ms) and eases to a stop,
 * so the hand-off never looks like a stall or a jump.
 */
export function finishProgress(
  t: number,
  from: number,
  speed: number,
  duration: number,
) {
  const x = Math.min(1, Math.max(0, t));
  const h01 = 3 * x * x - 2 * x * x * x;
  const h10 = x * x * x - 2 * x * x + x;
  return from + (100 - from) * h01 + speed * duration * h10;
}

/** Resolves once the page (images, scripts) and web fonts have loaded. */
function whenPageReady() {
  const load =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true }),
        );
  return Promise.all([load, document.fonts?.ready]);
}

/**
 * First-visit intro: a counter climbs 000 → 100 with the real page load while
 * "LIN1ER" rises, then an orange curtain carries the greetings in and the
 * whole overlay lifts away. It always shows for at least `minMs` and never
 * waits on the load for more than `maxMs`. Repeat visits in the same session
 * and reduced-motion users skip it.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("count");
  const [progress, setProgress] = useState(0);
  const [greeting, setGreeting] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef(0);

  const intro = homeContent.intro;
  const { minMs, maxMs, finishMs, curtainMs, greetingMs, holdMs, exitMs } =
    animationConfig.intro;

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    cancelAnimationFrame(raf.current);
    document.body.style.overflow = "";
    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("done");
    setIntroState("done");
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (seen || reduced) {
      timers.current = [setTimeout(finish, 0)];
      return () => timers.current.forEach(clearTimeout);
    }

    document.body.style.overflow = "hidden";
    setIntroState("playing");

    let loaded = false;
    let cancelled = false;
    whenPageReady().then(() => {
      loaded = true;
    });

    const pending: ReturnType<typeof setTimeout>[] = [];
    timers.current = pending;

    // Curtain → greetings → hold → exit, timed from the moment we hit 100%.
    const startOutro = () => {
      const schedule: [number, () => void][] = [];
      let at = 250;
      schedule.push([at, () => setPhase("curtain")]);
      at += curtainMs;
      schedule.push([at, () => setPhase("greet")]);
      for (let i = 1; i < intro.greetings.length; i++) {
        at += greetingMs;
        schedule.push([at, () => setGreeting(i)]);
      }
      at += holdMs;
      schedule.push([at, () => setPhase("exit")]);
      at += exitMs;
      schedule.push([at, finish]);
      for (const [ms, fn] of schedule) pending.push(setTimeout(fn, ms));
    };

    const start = performance.now();
    let finishStart: number | null = null;
    let finishFrom = 0;
    let finishSpeed = 0;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;

      if (finishStart === null) {
        const p = waitingProgress(elapsed, maxMs);
        setProgress(Math.round(p));
        if ((loaded || elapsed >= maxMs) && elapsed >= minMs) {
          finishStart = now;
          finishFrom = p;
          finishSpeed = waitingSpeed(elapsed, maxMs);
        }
        raf.current = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(1, (now - finishStart) / finishMs);
      const p = finishProgress(t, finishFrom, finishSpeed, finishMs);
      setProgress(Math.min(100, Math.round(p)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else startOutro();
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      pending.forEach(clearTimeout);
      cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
  }, [
    minMs,
    maxMs,
    finishMs,
    curtainMs,
    greetingMs,
    holdMs,
    exitMs,
    intro.greetings.length,
    finish,
  ]);

  if (phase === "done") return null;

  const counting = phase === "count";
  const curtainUp = !counting;
  const caption =
    intro.captions.find((c) => progress < c.until)?.text ?? "";
  const rest = 1 - progress / 100;

  return (
    <div
      role="status"
      data-preloader
      aria-label={`${intro.tag} ${progress}%`}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-ink text-concrete transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
      style={{ transitionDuration: `${exitMs}ms` }}
    >
      <div className="label absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-8">
        <span className="text-accent">{intro.tag}</span>
        <span className="flex items-center gap-6">
          <span className="hidden md:inline">{intro.version}</span>
          <button
            type="button"
            onClick={finish}
            className="relative z-30 border-2 border-concrete px-3 py-1.5 transition-colors hover:bg-concrete hover:text-ink"
          >
            {intro.skip} →
          </button>
        </span>
      </div>

      <div
        aria-hidden
        className="absolute left-[1.6vw] top-[16vh] text-[23vw] font-bold leading-[0.8] tracking-[-0.07em] text-accent will-change-transform"
        style={{
          transform: curtainUp
            ? "translateY(-160%) rotate(0deg)"
            : `translateY(${rest * 140}%) rotate(${rest * 7}deg)`,
          transition: curtainUp
            ? `transform ${curtainMs}ms cubic-bezier(0.87,0,0.13,1)`
            : "none",
        }}
      >
        {intro.name}
      </div>

      <div className="absolute bottom-[12vh] left-5 z-10 flex flex-col gap-4 md:left-8">
        <span className="text-[clamp(72px,8.4vw,120px)] font-bold leading-none tracking-[-0.06em] tabular-nums">
          {String(progress).padStart(3, "0")}%
        </span>
        <span className="label">{caption}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-5 bg-[#1e1e1c]">
        <div
          data-testid="preloader-bar"
          className="h-full bg-accent"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className="absolute inset-0 z-20 bg-accent text-ink transition-transform ease-[cubic-bezier(0.87,0,0.13,1)]"
        style={{
          transform: curtainUp ? "translateY(0)" : "translateY(100%)",
          transitionDuration: `${curtainMs}ms`,
        }}
      >
        {intro.greetings.map((word, i) => (
          <span
            key={word}
            aria-hidden={i !== greeting}
            className="absolute bottom-[10vh] left-5 text-[clamp(96px,16.6vw,240px)] font-bold leading-none tracking-[-0.07em] transition-opacity duration-500 md:left-8"
            style={{ opacity: i === greeting ? 1 : 0 }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
