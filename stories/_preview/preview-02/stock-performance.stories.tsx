// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/stock-performance.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { StockPerformance } from "@/components/blocks/preview-02/cards/stock-performance"

const meta: Meta<typeof StockPerformance> = {
  title: "Preview/Blocks 02/StockPerformance",
  component: StockPerformance,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof StockPerformance>

export const Default: Story = {}
