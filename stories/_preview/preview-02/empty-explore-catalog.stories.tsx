// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/empty-explore-catalog.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyExploreCatalog } from "@/components/blocks/preview-02/cards/empty-explore-catalog"

const meta: Meta<typeof EmptyExploreCatalog> = {
  title: "Preview/Blocks 02/EmptyExploreCatalog",
  component: EmptyExploreCatalog,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof EmptyExploreCatalog>

export const Default: Story = {}
