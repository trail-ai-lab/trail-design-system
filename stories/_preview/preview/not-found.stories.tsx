// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/not-found.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { NotFound } from "@/components/blocks/preview/cards/not-found"

const meta: Meta<typeof NotFound> = {
  title: "_Preview/Preview/NotFound",
  component: NotFound,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof NotFound>

export const Default: Story = {}
