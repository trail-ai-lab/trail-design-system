import type { Meta, StoryObj } from "@storybook/react-vite"

import { NoisyAudioBanner } from "@/components/slai/noisy-audio-banner"

const meta: Meta<typeof NoisyAudioBanner> = {
  title: "SLAI/NoisyAudioBanner",
  component: NoisyAudioBanner,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NoisyAudioBanner>

export const Default: Story = {}

export const CustomCopy: Story = {
  args: {
    title: "Background noise detected",
    description: "Group 3's microphone is picking up a lot of ambient sound.",
  },
}
