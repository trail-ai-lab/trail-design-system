// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/kitchen-island.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { KitchenIsland } from "@/components/blocks/preview-02/cards/kitchen-island"

const meta: Meta<typeof KitchenIsland> = {
  title: "_Preview/Preview-02/KitchenIsland",
  component: KitchenIsland,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof KitchenIsland>

export const Default: Story = {}
