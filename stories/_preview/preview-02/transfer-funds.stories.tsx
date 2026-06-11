// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/transfer-funds.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { TransferFunds } from "@/components/blocks/preview-02/cards/transfer-funds"

const meta: Meta<typeof TransferFunds> = {
  title: "_Preview/Preview-02/TransferFunds",
  component: TransferFunds,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof TransferFunds>

export const Default: Story = {}
