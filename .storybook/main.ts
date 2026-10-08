import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/react-vite"
import remarkGfm from "remark-gfm"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    {
      // GitHub-flavored Markdown (tables, task lists) in MDX docs pages.
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(viteConfig) {
    // Match the `@/*` path alias from tsconfig.json. Tailwind runs through
    // postcss.config.mjs, which Vite picks up automatically.
    viteConfig.resolve ??= {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    }
    return viteConfig
  },
}

export default config
