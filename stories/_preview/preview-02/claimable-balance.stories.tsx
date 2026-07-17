// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/claimable-balance.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ClaimableBalance } from "@/components/blocks/preview-02/cards/claimable-balance"

const meta: Meta<typeof ClaimableBalance> = {
  title: "_Preview/Preview-02/ClaimableBalance",
  component: ClaimableBalance,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ClaimableBalance>

export const Default: Story = {}
