// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/savings-targets.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SavingsTargets } from "@/components/blocks/preview-02/cards/savings-targets"

const meta: Meta<typeof SavingsTargets> = {
  title: "_Preview/Preview-02/SavingsTargets",
  component: SavingsTargets,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SavingsTargets>

export const Default: Story = {}
