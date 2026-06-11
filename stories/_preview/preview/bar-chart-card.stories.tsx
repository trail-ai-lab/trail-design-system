// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/bar-chart-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { BarChartCard } from "@/components/blocks/preview/cards/bar-chart-card"

const meta: Meta<typeof BarChartCard> = {
  title: "_Preview/Preview/BarChartCard",
  component: BarChartCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof BarChartCard>

export const Default: Story = {}
