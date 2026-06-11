// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/cover-art.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { CoverArt } from "@/components/blocks/preview-02/cards/cover-art"

const meta: Meta<typeof CoverArt> = {
  title: "_Preview/Preview-02/CoverArt",
  component: CoverArt,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof CoverArt>

export const Default: Story = {}
