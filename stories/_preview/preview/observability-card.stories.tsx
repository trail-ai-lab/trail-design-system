// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/observability-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ObservabilityCard } from "@/components/blocks/preview/cards/observability-card"

const meta: Meta<typeof ObservabilityCard> = {
  title: "_Preview/Preview/ObservabilityCard",
  component: ObservabilityCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ObservabilityCard>

export const Default: Story = {}
