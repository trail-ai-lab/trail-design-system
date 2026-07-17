// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/card-overview.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { CardOverview } from "@/components/blocks/preview-02/cards/card-overview"

const meta: Meta<typeof CardOverview> = {
  title: "_Preview/Preview-02/CardOverview",
  component: CardOverview,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof CardOverview>

export const Default: Story = {}
