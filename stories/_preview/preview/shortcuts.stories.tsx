// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/shortcuts.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Shortcuts } from "@/components/blocks/preview/cards/shortcuts"

const meta: Meta<typeof Shortcuts> = {
  title: "_Preview/Preview/Shortcuts",
  component: Shortcuts,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Shortcuts>

export const Default: Story = {}
