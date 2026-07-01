import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      all: true,
      reporter: ["text", "text-summary", "html"],
      // Global coverage: every source file under these roots counts toward the
      // denominator, even ones no test imports directly.
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
