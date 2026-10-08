import type { Meta, StoryObj } from "@storybook/react-vite"

import { ModeToggle } from "@/components/patterns"

// next-themes' ThemeProvider comes from the global decorator in .storybook/preview.ts.
const meta: Meta<typeof ModeToggle> = {
  title: "Patterns/ModeToggle",
  component: ModeToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ModeToggle>

export const Default: Story = {}

/** `icon-sm` for dense app headers such as the SLAI AppShell. */
export const Small: Story = { args: { size: "icon-sm" } }
