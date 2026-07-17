// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/icon-preview-grid.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { IconPreviewGrid } from "@/components/blocks/preview/cards/icon-preview-grid"

const meta: Meta<typeof IconPreviewGrid> = {
  title: "_Preview/Preview/IconPreviewGrid",
  component: IconPreviewGrid,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof IconPreviewGrid>

export const Default: Story = {}
