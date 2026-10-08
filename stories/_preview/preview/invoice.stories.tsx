// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/invoice.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { Invoice } from "@/components/blocks/preview/cards/invoice"

const meta: Meta<typeof Invoice> = {
  title: "Preview/Blocks 01/Invoice",
  component: Invoice,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Invoice>

export const Default: Story = {}
