// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/sleep-report.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SleepReport } from "@/components/blocks/preview/cards/sleep-report"

const meta: Meta<typeof SleepReport> = {
  title: "_Preview/Preview/SleepReport",
  component: SleepReport,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SleepReport>

export const Default: Story = {}
