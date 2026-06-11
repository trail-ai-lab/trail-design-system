// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/contributions-activity.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ContributionsActivity } from "@/components/blocks/preview/cards/contributions-activity"

const meta: Meta<typeof ContributionsActivity> = {
  title: "_Preview/Preview/ContributionsActivity",
  component: ContributionsActivity,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ContributionsActivity>

export const Default: Story = {}
