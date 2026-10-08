import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ALL_GROUPS,
  GroupSwitcher,
  type SwitcherGroup,
} from "@/components/slai/group-switcher"

const GROUPS: SwitcherGroup[] = [
  { id: "group-1", name: "Group 1", status: "recording" },
  { id: "group-2", name: "Group 2", status: "paused" },
  { id: "group-3", name: "Group 3", status: "uploaded" },
  { id: "group-4", name: "Group 4", status: "stopped" },
  { id: "group-5", name: "Group 5", status: "idle" },
]

const meta: Meta<typeof GroupSwitcher> = {
  title: "SLAI/GroupSwitcher",
  component: GroupSwitcher,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof GroupSwitcher>

function Controlled({
  groups,
  initial = groups[0].id,
}: {
  groups: SwitcherGroup[]
  initial?: string
}) {
  const [value, setValue] = React.useState(initial)
  return (
    <GroupSwitcher groups={groups} value={value} onValueChange={setValue} />
  )
}

export const Default: Story = {
  render: () => <Controlled groups={GROUPS} />,
}

export const TwoGroups: Story = {
  render: () => <Controlled groups={GROUPS.slice(0, 2)} />,
}

/** The combined view, selected from the last item. */
export const AllGroupsSelected: Story = {
  render: () => <Controlled groups={GROUPS} initial={ALL_GROUPS} />,
}
