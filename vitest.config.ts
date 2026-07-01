import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Resolve the "@/..." alias explicitly (mirrors tsconfig paths) instead of via
// vite-tsconfig-paths, which honors tsconfig `exclude` — the production build
// excludes test files from tsconfig, and that would otherwise break their alias.
const rootDir = fileURLToPath(new URL(".", import.meta.url)).replace(/\/$/, "");

export default defineConfig({
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
      // Global coverage: every source file under these roots counts toward the
      // denominator, even ones no test imports directly. `include` + Vitest's
      // default `all: true` make uncovered files count.
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "data/**/*.{ts,tsx}"],
      // Exclude non-source only (config, type decls, test/setup, assets, build output).
      exclude: [
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "vitest.setup.ts",
        "vitest.config.ts",
        "next.config.ts",
        "postcss.config.mjs",
        "eslint.config.mjs",
        "public/**",
        ".next/**",
        "node_modules/**",
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70,
      },
    },
  },
});
