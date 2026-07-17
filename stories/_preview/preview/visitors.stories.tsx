// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/visitors.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Visitors } from "@/components/blocks/preview/cards/visitors"

const meta: Meta<typeof Visitors> = {
  title: "_Preview/Preview/Visitors",
  component: Visitors,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Visitors>

export const Default: Story = {}
