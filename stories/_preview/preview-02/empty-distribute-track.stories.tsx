// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/empty-distribute-track.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyDistributeTrack } from "@/components/blocks/preview-02/cards/empty-distribute-track"

const meta: Meta<typeof EmptyDistributeTrack> = {
  title: "Preview/Blocks 02/EmptyDistributeTrack",
  component: EmptyDistributeTrack,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof EmptyDistributeTrack>

export const Default: Story = {}
