// @ts-check
import js from "@eslint/js"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactHooks from "eslint-plugin-react-hooks"
import storybook from "eslint-plugin-storybook"
import globals from "globals"
import tseslint from "typescript-eslint"

import trail from "./eslint/trail-plugin.mjs"

export default tseslint.config(
  {
    ignores: [
      "dist",
      "storybook-static",
      ".next",
      // CLI-managed and reference code: never hand-edited, not linted
      "src/components/ui",
      "src/hooks",
      "src/components/blocks",
      "stories/_preview",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { trail },
    rules: {
      "trail/no-raw-colors": "error",
      "trail/no-arbitrary-values": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Tests feed raw class strings to cn() as data; the token rules don't apply.
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "trail/no-raw-colors": "off",
      "trail/no-arbitrary-values": "off",
    },
  }
)
