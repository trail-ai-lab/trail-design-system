// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/icon-preview-grid.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconPreviewGrid } from "@/components/blocks/preview/cards/icon-preview-grid"

const meta: Meta<typeof IconPreviewGrid> = {
  title: "Preview/Blocks 01/IconPreviewGrid",
  component: IconPreviewGrid,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof IconPreviewGrid>

export const Default: Story = {}
