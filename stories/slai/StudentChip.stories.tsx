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
