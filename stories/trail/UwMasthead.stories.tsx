import type { Meta, StoryObj } from "@storybook/nextjs"

import { UwMasthead } from "@/components/trail"

const meta: Meta<typeof UwMasthead> = {
  title: "Trail/UwMasthead",
  component: UwMasthead,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof UwMasthead>

export const Default: Story = {}

export const CustomDepartment: Story = {
  args: {
    departmentName: "Department of Computer Sciences",
    departmentHref: "https://www.cs.wisc.edu",
  },
}
