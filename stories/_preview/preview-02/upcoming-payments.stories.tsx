// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/upcoming-payments.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { UpcomingPayments } from "@/components/blocks/preview-02/cards/upcoming-payments"

const meta: Meta<typeof UpcomingPayments> = {
  title: "Preview/Blocks 02/UpcomingPayments",
  component: UpcomingPayments,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof UpcomingPayments>

export const Default: Story = {}
