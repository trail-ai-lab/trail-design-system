// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/loading-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { LoadingCard } from "@/components/blocks/preview-02/cards/loading-card"

const meta: Meta<typeof LoadingCard> = {
  title: "_Preview/Preview-02/LoadingCard",
  component: LoadingCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof LoadingCard>

export const Default: Story = {}
