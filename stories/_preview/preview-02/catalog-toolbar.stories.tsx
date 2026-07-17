// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/catalog-toolbar.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { CatalogToolbar } from "@/components/blocks/preview-02/cards/catalog-toolbar"

const meta: Meta<typeof CatalogToolbar> = {
  title: "_Preview/Preview-02/CatalogToolbar",
  component: CatalogToolbar,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof CatalogToolbar>

export const Default: Story = {}
