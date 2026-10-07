import type { Meta, StoryObj } from "@storybook/nextjs"

import { GroupCard } from "@/components/slai/group-card"
import { ROSTER } from "./_student-fixtures"

const meta: Meta<typeof GroupCard> = {
  title: "SLAI/GroupCard",
  component: GroupCard,
  tags: ["autodocs"],
  args: {
    roster: ROSTER,
    group: { id: "g1", name: "Group 1", studentIds: ["rosa", "diego"] },
    unassigned: ROSTER.filter((s) => !["rosa", "diego"].includes(s.id)),
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
type Story = StoryObj<typeof GroupCard>

export const Default: Story = {}

export const Empty: Story = {
  args: { group: { id: "g2", name: "Group 2", studentIds: [] } },
}

/** A student is selected elsewhere, so the whole card is a click target. */
export const Placing: Story = { args: { placing: "Mei" } }
