// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/contribution-history.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ContributionHistory } from "@/components/blocks/preview-02/cards/contribution-history"

const meta: Meta<typeof ContributionHistory> = {
  title: "_Preview/Preview-02/ContributionHistory",
  component: ContributionHistory,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ContributionHistory>

export const Default: Story = {}
