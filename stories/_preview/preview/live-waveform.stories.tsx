// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/live-waveform.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { LiveWaveformCard } from "@/components/blocks/preview/cards/live-waveform"

const meta: Meta<typeof LiveWaveformCard> = {
  title: "_Preview/Preview/LiveWaveformCard",
  component: LiveWaveformCard,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof LiveWaveformCard>

export const Default: Story = {}
