import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckIcon, MicIcon, PauseIcon } from "lucide-react"

import { StatusBadge } from "@/components/patterns/status-badge"

const meta: Meta<typeof StatusBadge> = {
  title: "Patterns/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  args: { children: "Upcoming", tone: "primary" },
}
export default meta
type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {}

/** Meaning tones: one hue, one meaning. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="neutral">Neutral</StatusBadge>
      <StatusBadge tone="muted">Muted</StatusBadge>
      <StatusBadge tone="primary">Primary</StatusBadge>
      <StatusBadge tone="success">Met</StatusBadge>
      <StatusBadge tone="warning">Partial</StatusBadge>
      <StatusBadge tone="info">Info</StatusBadge>
      <StatusBadge tone="destructive">Not yet</StatusBadge>
    </div>
  ),
}

/** Recording-state tones — only for recording state. */
export const RecordingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="recording" dot pulse>
        Recording
      </StatusBadge>
      <StatusBadge tone="paused" dot>
        Paused
      </StatusBadge>
      <StatusBadge tone="uploaded" dot>
        Uploaded
      </StatusBadge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="recording" icon={MicIcon}>
        Recording
      </StatusBadge>
      <StatusBadge tone="paused" icon={PauseIcon}>
        Paused
      </StatusBadge>
      <StatusBadge tone="uploaded" icon={CheckIcon}>
        Uploaded
      </StatusBadge>
    </div>
  ),
}
