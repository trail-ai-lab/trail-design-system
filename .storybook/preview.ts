import type { Preview } from "@storybook/react-vite"
import React from "react"
import { ThemeProvider, useTheme } from "next-themes"
import "./storybook.css"

import { TooltipProvider } from "../src/components/ui/tooltip"

// Toolbar control for switching the design-system theme. Apps use next-themes
// with `attribute="class"`, which toggles `class="dark"` on <html>. Stories get
// the same provider so theme-aware components (e.g. ModeToggle) work here too;
// the toolbar drives it via setTheme, and an in-story toggle can still change it.
type Theme = "light" | "dark"

function SyncTheme({ theme }: { theme: Theme }) {
  const { setTheme } = useTheme()
  React.useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])
  React.useEffect(() => {
    // Mirror the page background so the canvas matches the active theme.
    document.body.style.backgroundColor = "var(--background)"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])
  return null
}

function ThemedStory({
  Story,
  theme,
}: {
  Story: React.ComponentType
  theme: Theme
}) {
  return React.createElement(
    ThemeProvider,
    {
      attribute: "class",
      defaultTheme: theme,
      enableSystem: true,
      disableTransitionOnChange: true,
    },
    React.createElement(SyncTheme, { theme }),
    // Apps wrap their root in TooltipProvider (shadcn's Tooltip requires it).
    React.createElement(TooltipProvider, null, React.createElement(Story))
  )
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
    // Reference cards (Preview/Blocks */*) have no intrinsic width and would otherwise
    // collapse to min-content under the "centered" layout. Give them a fixed
    // column width that matches the well-designed cards (max-w-sm = 24rem).
    (Story, context) =>
      context.title.startsWith("Preview/Blocks")
        ? React.createElement(
            "div",
            { className: "w-96" },
            React.createElement(Story)
          )
        : React.createElement(Story),
  ],
  parameters: {
    options: {
      // Foundations (tokens) → primitives (UI) → shared patterns → tools,
      // with the shadcn inspiration blocks last.
      storySort: {
        order: [
          "Getting Started",
          "Foundations",
          [
            "Colors",
            "Typography",
            "Spacing",
            "Radius",
            "Elevation",
            "Motion",
            "Focus",
            "Stacking",
          ],
          "UI",
          "Patterns",
          "SLAI",
          ["Pages", "Shell"],
          "LabWebsite",
          "Preview",
          ["Showcase 01", "Showcase 02", "Blocks 01", "Blocks 02"],
        ],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
}

export default preview
