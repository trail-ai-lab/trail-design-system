// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/index-investing.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { IndexInvesting } from "@/components/blocks/preview-02/cards/index-investing"

const meta: Meta<typeof IndexInvesting> = {
  title: "_Preview/Preview-02/IndexInvesting",
  component: IndexInvesting,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof IndexInvesting>

export const Default: Story = {}
