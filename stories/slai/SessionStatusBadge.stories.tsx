import type { Meta, StoryObj } from "@storybook/nextjs"

import { SessionStatusBadge } from "@/components/slai/session-status-badge"

const meta: Meta<typeof SessionStatusBadge> = {
  title: "SLAI/SessionStatusBadge",
  component: SessionStatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["recording", "paused", "uploaded"],
    },
    showIcon: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof SessionStatusBadge>

export const Recording: Story = {
  args: { status: "recording" },
}

export const Paused: Story = {
  args: { status: "paused" },
}

export const Uploaded: Story = {
  args: { status: "uploaded" },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <SessionStatusBadge status="recording" showIcon />
      <SessionStatusBadge status="paused" showIcon />
      <SessionStatusBadge status="uploaded" showIcon />
      <SessionStatusBadge status="stopped" showIcon />
      <SessionStatusBadge status="idle" showIcon />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <SessionStatusBadge status="recording" />
      <SessionStatusBadge status="paused" />
      <SessionStatusBadge status="uploaded" />
      <SessionStatusBadge status="stopped" />
      <SessionStatusBadge status="idle" />
    </div>
  ),
}

export const Stopped: Story = { args: { status: "stopped" } }

export const Idle: Story = { args: { status: "idle" } }

/** `elapsedSeconds` appends a live mm:ss timer to recording and paused badges. */
export const WithTimer: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <SessionStatusBadge status="recording" elapsedSeconds={754} />
      <SessionStatusBadge status="paused" elapsedSeconds={1310} />
    </div>
  ),
}
