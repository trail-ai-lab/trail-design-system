import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import { GlobeIcon, SignalIcon } from "lucide-react"

import { GroupBuilder } from "@/components/slai/group-builder"
import type { SessionGroup } from "@/components/slai/group-card"
import { PRESETS, ROSTER } from "./_student-fixtures"

const meta: Meta<typeof GroupBuilder> = {
  title: "SLAI/GroupBuilder",
  component: GroupBuilder,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { roster: ROSTER },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GroupBuilder>

function Controlled(
  props: React.ComponentProps<typeof GroupBuilder> & { initial?: SessionGroup[] }
) {
  const [groups, setGroups] = React.useState(props.initial ?? [])
  return <GroupBuilder {...props} groups={groups} onGroupsChange={setGroups} />
}

/** Everyone starts unassigned; select a student, then click a group card. */
export const Manual: Story = {
  render: (args) => (
    <Controlled
      {...args}
      initial={[
        { id: "g1", name: "Group 1", studentIds: [] },
        { id: "g2", name: "Group 2", studentIds: [] },
      ]}
    />
  ),
}

export const WithPresets: Story = {
  render: (args) => (
    <Controlled
      {...args}
      presets={[
        { ...PRESETS[0], icon: <GlobeIcon /> },
        { ...PRESETS[1], icon: <SignalIcon /> },
      ]}
    />
  ),
}
