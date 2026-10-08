import path from "node:path"

import { defineConfig } from "vitest/config"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"

import { playwright } from "@vitest/browser-playwright"

const dirname = import.meta.dirname

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: { "@": path.join(dirname, "src") },
  },
  test: {
    projects: [
      // Unit tests for plain TypeScript (utilities, helpers) in Node.
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
      // Every story rendered in a real browser, with play functions and
      // axe accessibility checks (configured in .storybook/preview.ts).
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          // Preview blocks are unmodified shadcn reference content — browsable
          // in Storybook but not ours to test.
          exclude: ["stories/_preview/**"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
