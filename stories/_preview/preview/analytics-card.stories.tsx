// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/analytics-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { AnalyticsCard } from "@/components/blocks/preview/cards/analytics-card"

const meta: Meta<typeof AnalyticsCard> = {
  title: "Preview/Blocks 01/AnalyticsCard",
  component: AnalyticsCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof AnalyticsCard>

export const Default: Story = {}
