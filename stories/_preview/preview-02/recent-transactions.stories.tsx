// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/recent-transactions.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { RecentTransactions } from "@/components/blocks/preview-02/cards/recent-transactions"

const meta: Meta<typeof RecentTransactions> = {
  title: "_Preview/Preview-02/RecentTransactions",
  component: RecentTransactions,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof RecentTransactions>

export const Default: Story = {}
