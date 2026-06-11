// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/receiving-method.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ReceivingMethod } from "@/components/blocks/preview-02/cards/receiving-method"

const meta: Meta<typeof ReceivingMethod> = {
  title: "_Preview/Preview-02/ReceivingMethod",
  component: ReceivingMethod,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ReceivingMethod>

export const Default: Story = {}
