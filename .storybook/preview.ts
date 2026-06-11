import type { Preview } from "@storybook/nextjs"
import React from "react"
import "../src/tokens/globals.css"
import "../src/tokens/storybook-fonts.css"

// Toolbar control for switching the design-system theme. The cards project uses
// next-themes with `attribute="class"`, which toggles `class="dark"` on <html>.
// Storybook has no next-themes provider, so we replicate that here: the decorator
// below adds/removes the `dark` class on the iframe's <html> element so the
// class-based `dark:` variants and `.dark {}` token overrides in globals.css apply.
const THEMES = ["light", "dark"] as const
type Theme = (typeof THEMES)[number]

function ThemedStory({ Story, theme }: { Story: React.ComponentType; theme: Theme }) {
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    // Mirror the page background so the canvas matches the active theme.
    document.body.style.backgroundColor = "var(--background)"
    return () => {
      root.classList.remove("dark")
      document.body.style.backgroundColor = ""
    }
  }, [theme])

  return React.createElement(Story)
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Design system theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Apply the selected theme by toggling the `dark` class on <html>.
    (Story, context) =>
      React.createElement(ThemedStory, {
        Story: Story as React.ComponentType,
        theme: (context.globals.theme as Theme) ?? "light",
      }),
    // Reference cards (_Preview/*) have no intrinsic width and would otherwise
    // collapse to min-content under the "centered" layout. Give them a fixed
    // column width that matches the well-designed cards (max-w-sm = 24rem).
    (Story, context) =>
      context.title.startsWith("_Preview/")
        ? React.createElement(
            "div",
            { className: "w-96" },
            React.createElement(Story),
          )
        : React.createElement(Story),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
