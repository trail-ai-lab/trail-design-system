import type { Meta, StoryObj } from "@storybook/nextjs"

import { RecordingCard } from "@/components/slai/recording-card"

const meta: Meta<typeof RecordingCard> = {
  title: "SLAI/RecordingCard",
  component: RecordingCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    className: "w-full max-w-md",
  },
}

export default meta
type Story = StoryObj<typeof RecordingCard>

export const Default: Story = {}
