// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/payments.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Payments } from "@/components/blocks/preview-02/cards/payments"

const meta: Meta<typeof Payments> = {
  title: "_Preview/Preview-02/Payments",
  component: Payments,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Payments>

export const Default: Story = {}
