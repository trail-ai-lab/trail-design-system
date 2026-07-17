import type { Meta, StoryObj } from "@storybook/nextjs"

import { RecordingControl } from "@/components/slai/recording-control"

const meta: Meta<typeof RecordingControl> = {
  title: "SLAI/RecordingControl",
  component: RecordingControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RecordingControl>

export const Default: Story = {}

export const StudentCaptions: Story = {
  args: {
    captions: {
      idle: "Tap to start recording",
      recording: "Tap to pause recording",
      paused: "Paused — tap to resume",
    },
  },
}

export const Recording: Story = {
  args: { defaultState: "recording" },
}

export const Paused: Story = {
  args: { defaultState: "paused" },
}
