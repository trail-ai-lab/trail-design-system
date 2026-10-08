// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/dividend-income.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { DividendIncome } from "@/components/blocks/preview-02/cards/dividend-income"

const meta: Meta<typeof DividendIncome> = {
  title: "Preview/Blocks 02/DividendIncome",
  component: DividendIncome,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof DividendIncome>

export const Default: Story = {}
