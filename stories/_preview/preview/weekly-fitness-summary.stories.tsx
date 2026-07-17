// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/weekly-fitness-summary.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { WeeklyFitnessSummary } from "@/components/blocks/preview/cards/weekly-fitness-summary"

const meta: Meta<typeof WeeklyFitnessSummary> = {
  title: "_Preview/Preview/WeeklyFitnessSummary",
  component: WeeklyFitnessSummary,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof WeeklyFitnessSummary>

export const Default: Story = {}
