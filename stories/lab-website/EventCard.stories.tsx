import type { Meta, StoryObj } from "@storybook/nextjs"

import { EventCard } from "@/components/lab-website/event-card"

const meta: Meta<typeof EventCard> = {
  title: "LabWebsite/EventCard",
  component: EventCard,
  parameters: { layout: "padded" },
  args: {
    event: {
      id: "tutorial-aibat-aied2026",
      title: "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
      conference: "AIED 2026",
      year: 2026,
      status: "upcoming",
      href: "/tutorials/tutorial-aibat-aied2026",
    },
  },
}
export default meta

type Story = StoryObj<typeof EventCard>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <EventCard {...args} />
    </div>
  ),
}
