// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/contributors.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Contributors } from "@/components/blocks/preview/cards/contributors"

const meta: Meta<typeof Contributors> = {
  title: "_Preview/Preview/Contributors",
  component: Contributors,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Contributors>

export const Default: Story = {}
