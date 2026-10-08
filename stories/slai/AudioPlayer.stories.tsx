import type { Meta, StoryObj } from "@storybook/react-vite"

import { AudioPlayerCard } from "@/components/slai/audio-player-card"

// a11y: aria-input-field-name disabled. Upstream: shadcn's Slider doesn't pass aria-label to the Radix thumb.
const A11Y = {
  config: {
    rules: [{ id: "aria-input-field-name", enabled: false }],
  },
}

const meta: Meta<typeof AudioPlayerCard> = {
  title: "SLAI/AudioPlayerCard",
  component: AudioPlayerCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: A11Y },
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

export const Compact: Story = {
  args: { durationSeconds: 312, compact: true },
}

export const Loading: Story = {
  args: { loading: true },
}
