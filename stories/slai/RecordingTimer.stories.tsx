import type { Meta, StoryObj } from "@storybook/react-vite"

import { RecordingTimer } from "@/components/slai/recording-timer"

const meta: Meta<typeof RecordingTimer> = {
  title: "SLAI/RecordingTimer",
  component: RecordingTimer,
  tags: ["autodocs"],
  args: { seconds: 754 },
}

export default meta
type Story = StoryObj<typeof RecordingTimer>

export const Default: Story = {}

export const Compact: Story = { args: { compact: true } }

export const OverAnHour: Story = { args: { seconds: 3725 } }
