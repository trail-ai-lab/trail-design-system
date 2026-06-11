// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/usage-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { UsageCard } from "@/components/blocks/preview/cards/usage-card"

const meta: Meta<typeof UsageCard> = {
  title: "_Preview/Preview/UsageCard",
  component: UsageCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof UsageCard>

export const Default: Story = {}
