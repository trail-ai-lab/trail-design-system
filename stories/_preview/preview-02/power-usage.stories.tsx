// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/power-usage.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { PowerUsage } from "@/components/blocks/preview-02/cards/power-usage"

const meta: Meta<typeof PowerUsage> = {
  title: "_Preview/Preview-02/PowerUsage",
  component: PowerUsage,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof PowerUsage>

export const Default: Story = {}
