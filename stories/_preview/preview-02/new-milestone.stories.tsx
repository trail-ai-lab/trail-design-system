// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/new-milestone.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { NewMilestone } from "@/components/blocks/preview-02/cards/new-milestone"

const meta: Meta<typeof NewMilestone> = {
  title: "_Preview/Preview-02/NewMilestone",
  component: NewMilestone,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof NewMilestone>

export const Default: Story = {}
