import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { SpeakerAssignDropdown } from "@/components/slai/speaker-assign-dropdown"

const meta: Meta<typeof SpeakerAssignDropdown> = {
  title: "SLAI/SpeakerAssignDropdown",
  component: SpeakerAssignDropdown,
  tags: ["autodocs"],
  args: {
    students: ["Asha", "Ben", "Chen", "Dara"],
    onValueChange: () => {},
    "aria-label": "Student for Speaker 1",
  },
}

export default meta
type Story = StoryObj<typeof SpeakerAssignDropdown>

export const Unassigned: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>()
    return (
      <SpeakerAssignDropdown {...args} value={value} onValueChange={setValue} />
    )
  },
}

export const Assigned: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>("Ben")
    return (
      <SpeakerAssignDropdown {...args} value={value} onValueChange={setValue} />
    )
  },
}

/** Typing a name that is not on the roster offers "Add student". */
export const WithAddStudent: Story = {
  render: function Controlled(args) {
    const [students, setStudents] = React.useState(args.students)
    const [value, setValue] = React.useState<string | undefined>()
    return (
      <SpeakerAssignDropdown
        {...args}
        students={students}
        value={value}
        onValueChange={setValue}
        onAddStudent={(name) => setStudents((list) => [...list, name])}
      />
    )
  },
}

export const Disabled: Story = { args: { disabled: true, value: "Asha" } }
