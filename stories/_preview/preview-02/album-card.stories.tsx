// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/album-card.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { AlbumCard } from "@/components/blocks/preview-02/cards/album-card"

const meta: Meta<typeof AlbumCard> = {
  title: "_Preview/Preview-02/AlbumCard",
  component: AlbumCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof AlbumCard>

export const Default: Story = {}
