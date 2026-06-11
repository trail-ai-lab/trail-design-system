// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/codespaces-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { CodespacesCard } from "@/components/blocks/preview/cards/codespaces-card"

const meta: Meta<typeof CodespacesCard> = {
  title: "_Preview/Preview/CodespacesCard",
  component: CodespacesCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof CodespacesCard>

export const Default: Story = {}
