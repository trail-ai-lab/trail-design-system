import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  ALL_GROUPS,
  GroupSwitcher,
  type SwitcherGroup,
} from "@/components/slai/group-switcher"

const GROUPS: SwitcherGroup[] = [
  { id: "group-1", name: "Group 1", memberCount: 5, active: true },
  { id: "group-2", name: "Group 2", memberCount: 2, active: true },
  { id: "group-3", name: "Group 3", memberCount: 3, active: false },
]

const meta: Meta<typeof GroupSwitcher> = {
  title: "SLAI/GroupSwitcher",
  component: GroupSwitcher,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof GroupSwitcher>

function Controlled({ groups }: { groups: SwitcherGroup[] }) {
  const [value, setValue] = React.useState(ALL_GROUPS)
  return <GroupSwitcher groups={groups} value={value} onValueChange={setValue} />
}

export const Default: Story = {
  render: () => <Controlled groups={GROUPS} />,
}

export const TwoGroups: Story = {
  render: () => <Controlled groups={GROUPS.slice(0, 2)} />,
}
