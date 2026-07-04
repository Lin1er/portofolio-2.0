import * as React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Reset DOM + mocks between tests so every unit stays isolated (London style).
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// --- framer-motion ------------------------------------------------------------
// Render motion.<tag> as the plain DOM tag, stripping animation-only props so
// components render synchronously in jsdom with no real animation runtime.
const MOTION_ONLY_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "whileInView",
  "viewport",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "layout",
  "layoutId",
  "layoutScroll",
  "custom",
  "transformTemplate",
  "onAnimationStart",
  "onAnimationComplete",
  "onViewportEnter",
  "onViewportLeave",
  "onHoverStart",
  "onHoverEnd",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onDrag",
  "onDragStart",
  "onDragEnd",
]);

function stripMotionProps(props: Record<string, unknown>) {
  const clean: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!MOTION_ONLY_PROPS.has(key)) clean[key] = props[key];
  }
  return clean;
}

vi.mock("framer-motion", () => {
  // Cache one component per tag so `motion.div` is a stable type across
  // renders (a fresh forwardRef per access would remount the subtree).
  const motionCache = new Map<string, React.ComponentType>();
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        const cached = motionCache.get(tag);
        if (cached) return cached;
        const Component = React.forwardRef(
          (
            props: Record<string, unknown> & { children?: React.ReactNode },
            ref: React.Ref<unknown>,
          ) => {
            const { children, ...rest } = props;
            return React.createElement(
              typeof tag === "string" ? tag : "div",
              { ...stripMotionProps(rest), ref },
              children as React.ReactNode,
            );
          },
        );
        Component.displayName = `motion.${String(tag)}`;
        motionCache.set(tag, Component as React.ComponentType);
        return Component;
      },
    },
  );

  const passthroughValue = (initial: unknown = 0) => ({
    get: () => initial,
    set: vi.fn(),
    on: () => () => {},
    onChange: () => () => {},
  });

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      children ?? null,
    useScroll: () => ({
      scrollY: passthroughValue(0),
      scrollYProgress: passthroughValue(0),
      scrollX: passthroughValue(0),
      scrollXProgress: passthroughValue(0),
    }),
    useTransform: () => passthroughValue(0),
    useSpring: (value: unknown) => value ?? passthroughValue(0),
    useMotionValue: (initial: unknown) => passthroughValue(initial),
    useMotionValueEvent: () => {},
    useMotionTemplate: () => passthroughValue(""),
    useInView: () => true,
    useAnimation: () => ({ start: vi.fn(() => Promise.resolve()), stop: vi.fn() }),
    useAnimationControls: () => ({
      start: vi.fn(() => Promise.resolve()),
      stop: vi.fn(),
    }),
    useReducedMotion: () => false,
    MotionConfig: ({ children }: { children?: React.ReactNode }) =>
      children ?? null,
    LazyMotion: ({ children }: { children?: React.ReactNode }) => children ?? null,
    domAnimation: {},
    m: motion,
  };
});

// --- next/image ---------------------------------------------------------------
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt = "",
    ...rest
  }: {
    src: unknown;
    alt?: string;
    [key: string]: unknown;
  }) => {
    // Drop next-specific props that aren't valid on a plain <img>.
    const {
      fill,
      priority,
      quality,
      placeholder,
      blurDataURL,
      loader,
      sizes,
      unoptimized,
      onLoadingComplete,
      ...imgProps
    } = rest;
    void fill;
    void priority;
    void quality;
    void placeholder;
    void blurDataURL;
    void loader;
    void sizes;
    void unoptimized;
    void onLoadingComplete;
    const resolvedSrc =
      typeof src === "string"
        ? src
        : (src as { src?: string })?.src ?? "";
    return React.createElement("img", { src: resolvedSrc, alt, ...imgProps });
  },
}));

// --- next-themes --------------------------------------------------------------
// Stable singleton so a test can spy on setTheme via the same useTheme() object.
const themeState = {
  theme: "dark",
  resolvedTheme: "dark",
  systemTheme: "dark",
  themes: ["light", "dark"],
  setTheme: vi.fn(),
};

vi.mock("next-themes", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children?: React.ReactNode }) =>
    children ?? null,
  useTheme: () => themeState,
}));

// --- next/font/google ---------------------------------------------------------
vi.mock("next/font/google", () => ({
  Geist: () => ({ className: "font-geist-sans", variable: "--font-geist-sans" }),
  Geist_Mono: () => ({
    className: "font-geist-mono",
    variable: "--font-geist-mono",
  }),
}));

// --- next/navigation ----------------------------------------------------------
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// --- next/og ------------------------------------------------------------------
// Minimal ImageResponse stand-in: records the element + options for smoke tests.
vi.mock("next/og", () => ({
  ImageResponse: class ImageResponseMock {
    element: unknown;
    options: unknown;
    status = 200;
    headers = new Map<string, string>([["content-type", "image/png"]]);
    constructor(element: unknown, options: unknown) {
      this.element = element;
      this.options = options;
    }
  },
}));

// --- @vercel/analytics & speed-insights ----------------------------------------
// Script injectors with no renderable output; stub to nothing in jsdom.
vi.mock("@vercel/analytics/next", () => ({
  __esModule: true,
  Analytics: () => null,
}));

vi.mock("@vercel/speed-insights/next", () => ({
  __esModule: true,
  SpeedInsights: () => null,
}));

// --- global fetch -------------------------------------------------------------
// Default stub; behavior-specific tests override the implementation.
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    } as Response),
  );
});
