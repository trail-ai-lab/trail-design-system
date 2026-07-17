// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/release-catalog.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ReleaseCatalog } from "@/components/blocks/preview-02/cards/release-catalog"

const meta: Meta<typeof ReleaseCatalog> = {
  title: "_Preview/Preview-02/ReleaseCatalog",
  component: ReleaseCatalog,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ReleaseCatalog>

export const Default: Story = {}
