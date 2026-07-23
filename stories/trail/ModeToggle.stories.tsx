import type { Meta, StoryObj } from "@storybook/nextjs"
import { ThemeProvider } from "next-themes"

import { ModeToggle } from "@/components/trail"

const meta: Meta<typeof ModeToggle> = {
  title: "Trail/ModeToggle",
  component: ModeToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <Story />
      </ThemeProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ModeToggle>

export const Default: Story = {}
