// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/savings-progress.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SavingsProgress } from "@/components/blocks/preview-02/cards/savings-progress"

const meta: Meta<typeof SavingsProgress> = {
  title: "_Preview/Preview-02/SavingsProgress",
  component: SavingsProgress,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SavingsProgress>

export const Default: Story = {}
