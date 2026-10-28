import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"

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

/** Click to switch between light and dark. */
export const Default: Story = {}

/** Each click flips the theme shown, with no menu in between. */
export const SwitchesOnClick: Story = {
  play: async ({ canvas, userEvent }) => {
    const html = document.documentElement
    const startedDark = html.classList.contains("dark")
    const toggle = canvas.getByRole("button", { name: "Toggle dark mode" })

    await userEvent.click(toggle)
    await waitFor(() =>
      expect(html.classList.contains("dark")).toBe(!startedDark)
    )
    await expect(canvas.queryByRole("dialog")).toBeNull()

    await userEvent.click(toggle)
    await waitFor(() =>
      expect(html.classList.contains("dark")).toBe(startedDark)
    )
  },
}

/** `icon-sm` for dense app headers such as the SLAI AppShell. */
export const Small: Story = { args: { size: "icon-sm" } }
