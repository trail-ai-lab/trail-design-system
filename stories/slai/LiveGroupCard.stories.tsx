import type { Meta, StoryObj } from "@storybook/nextjs"

import { LiveGroupCard } from "@/components/slai/live-group-card"

const meta: Meta<typeof LiveGroupCard> = {
  title: "SLAI/LiveGroupCard",
  component: LiveGroupCard,
  tags: ["autodocs"],
  args: {
    name: "Group 1",
    status: "recording",
    students: ["Mei", "Liam", "Rosa"],
    languages: ["Mandarin", "English"],
    elapsedSeconds: 312,
    chunks: [
      "Let's put the blocks into equal groups.",
      "Each group should have four.",
      "我们每组四个。",
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LiveGroupCard>

export const Recording: Story = {}

export const Paused: Story = { args: { status: "paused" } }

export const Stopped: Story = { args: { status: "stopped", chunks: [] } }

export const Idle: Story = { args: { status: "idle", chunks: [] } }

export const WaitingForSpeech: Story = { args: { chunks: [] } }
