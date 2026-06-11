import type { Preview } from "@storybook/nextjs"
import "../src/tokens/globals.css"
import "../src/tokens/storybook-fonts.css"

const preview: Preview = {
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
