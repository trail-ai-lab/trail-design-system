// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/shipping-address.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ShippingAddress } from "@/components/blocks/preview/cards/shipping-address"

const meta: Meta<typeof ShippingAddress> = {
  title: "_Preview/Preview/ShippingAddress",
  component: ShippingAddress,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ShippingAddress>

export const Default: Story = {}
