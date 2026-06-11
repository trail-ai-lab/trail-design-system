// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/ui-elements.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { UIElements } from "@/components/blocks/preview/cards/ui-elements"

const meta: Meta<typeof UIElements> = {
  title: "_Preview/Preview/UIElements",
  component: UIElements,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof UIElements>

export const Default: Story = {}
