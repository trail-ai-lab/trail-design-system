// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/style-overview.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { StyleOverview } from "@/components/blocks/preview/cards/style-overview"

const meta: Meta<typeof StyleOverview> = {
  title: "_Preview/Preview/StyleOverview",
  component: StyleOverview,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof StyleOverview>

export const Default: Story = {}
