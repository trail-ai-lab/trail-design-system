import type { Meta, StoryObj } from "@storybook/nextjs"

import { StudentChip } from "@/components/slai/student-chip"

const meta: Meta<typeof StudentChip> = {
  title: "SLAI/StudentChip",
  component: StudentChip,
  tags: ["autodocs"],
  args: {
    name: "Student 1",
  },
}

export default meta
type Story = StoryObj<typeof StudentChip>

export const Default: Story = {}

export const Removable: Story = {
  args: { onRemove: () => {} },
}

/** Roster variants show language, grade and WIDA level (or "native"). */
export const RosterChip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StudentChip name="Rosa" language="ES" grade={3} wida={4.1} />
      <StudentChip name="Liam" language="EN" grade={3} native />
      <StudentChip name="Mei" language="ZH" grade={3} wida={3.4} selected onClick={() => {}} />
    </div>
  ),
}
