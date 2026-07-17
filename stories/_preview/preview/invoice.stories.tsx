// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/invoice.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Invoice } from "@/components/blocks/preview/cards/invoice"

const meta: Meta<typeof Invoice> = {
  title: "_Preview/Preview/Invoice",
  component: Invoice,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Invoice>

export const Default: Story = {}
