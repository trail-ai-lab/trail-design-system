import type { Meta, StoryObj } from "@storybook/react-vite"

import { EventStatusBadge } from "@/components/lab-website/event-status-badge"

const meta: Meta<typeof EventStatusBadge> = {
  title: "LabWebsite/EventStatusBadge",
  component: EventStatusBadge,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof EventStatusBadge>

export const Upcoming: Story = { args: { status: "upcoming" } }

export const Past: Story = { args: { status: "past" } }
