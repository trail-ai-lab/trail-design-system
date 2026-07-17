import type { Meta, StoryObj } from "@storybook/nextjs"

import { ParticipationCard } from "@/components/slai/participation-card"

const meta: Meta<typeof ParticipationCard> = {
  title: "SLAI/ParticipationCard",
  component: ParticipationCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ParticipationCard>

export const Default: Story = {
  args: {
    scopeLabel: "Group 1",
    students: [
      { name: "Aarav", percent: 42, turns: 11 },
      { name: "Mia", percent: 33, turns: 9 },
      { name: "Jordan", percent: 25, turns: 6 },
    ],
  },
}

export const Uneven: Story = {
  args: {
    scopeLabel: "Group 2",
    students: [
      { name: "Priya", percent: 68, turns: 17 },
      { name: "Sam", percent: 22, turns: 6 },
      { name: "Leo", percent: 10, turns: 3 },
    ],
  },
}
