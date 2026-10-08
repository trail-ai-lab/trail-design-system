// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/observability-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { ObservabilityCard } from "@/components/blocks/preview/cards/observability-card"

const meta: Meta<typeof ObservabilityCard> = {
  title: "Preview/Blocks 01/ObservabilityCard",
  component: ObservabilityCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ObservabilityCard>

export const Default: Story = {}
