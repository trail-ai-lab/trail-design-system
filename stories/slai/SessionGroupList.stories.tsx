import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  SessionGroupList,
  type SessionGroupListItem,
} from "@/components/slai/session-group-list"

const GROUPS: SessionGroupListItem[] = [
  { id: "g1", name: "Group 1", students: ["Asha", "Ben", "Chen"], status: "uploaded" },
  { id: "g2", name: "Group 2", students: ["Dara", "Eli"], status: "stopped" },
  { id: "g3", name: "Group 3", students: [] },
]

const meta: Meta<typeof SessionGroupList> = {
  title: "SLAI/SessionGroupList",
  component: SessionGroupList,
  tags: ["autodocs"],
  args: { groups: GROUPS },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SessionGroupList>

export const Default: Story = {}

export const WithActive: Story = {
  render: function Controlled(args) {
    const [active, setActive] = React.useState("g2")
    return <SessionGroupList {...args} activeId={active} onSelect={setActive} />
  },
}
