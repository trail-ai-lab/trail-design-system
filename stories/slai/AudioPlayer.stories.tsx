import type { Meta, StoryObj } from "@storybook/nextjs"

import { AudioPlayerCard } from "@/components/slai/audio-player-card"

const meta: Meta<typeof AudioPlayerCard> = {
  title: "SLAI/AudioPlayerCard",
  component: AudioPlayerCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AudioPlayerCard>

export const Default: Story = {
  args: { durationSeconds: 1453 },
}

export const ShortClip: Story = {
  args: { title: "Group 2 recording", durationSeconds: 312 },
}
