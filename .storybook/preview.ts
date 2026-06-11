import type { Preview } from "@storybook/nextjs"
import React from "react"
import "../src/tokens/globals.css"
import "../src/tokens/storybook-fonts.css"

const preview: Preview = {
  decorators: [
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
