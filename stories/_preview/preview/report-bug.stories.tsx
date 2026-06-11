// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/report-bug.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ReportBug } from "@/components/blocks/preview/cards/report-bug"

const meta: Meta<typeof ReportBug> = {
  title: "_Preview/Preview/ReportBug",
  component: ReportBug,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ReportBug>

export const Default: Story = {}
