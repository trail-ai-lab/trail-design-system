// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/card-overview.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { CardOverview } from "@/components/blocks/preview-02/cards/card-overview"

const meta: Meta<typeof CardOverview> = {
  title: "Preview/Blocks 02/CardOverview",
  component: CardOverview,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof CardOverview>

export const Default: Story = {}
