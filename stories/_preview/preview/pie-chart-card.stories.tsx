// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/pie-chart-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { PieChartCard } from "@/components/blocks/preview/cards/pie-chart-card"

const meta: Meta<typeof PieChartCard> = {
  title: "_Preview/Preview/PieChartCard",
  component: PieChartCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof PieChartCard>

export const Default: Story = {}
