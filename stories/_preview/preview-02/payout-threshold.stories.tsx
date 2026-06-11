// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/payout-threshold.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { PayoutThreshold } from "@/components/blocks/preview-02/cards/payout-threshold"

const meta: Meta<typeof PayoutThreshold> = {
  title: "_Preview/Preview-02/PayoutThreshold",
  component: PayoutThreshold,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof PayoutThreshold>

export const Default: Story = {}
