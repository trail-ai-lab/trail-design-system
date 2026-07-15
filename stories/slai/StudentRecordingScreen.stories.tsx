import type { Meta, StoryObj } from "@storybook/nextjs"

import { StudentRecordingScreen } from "@/components/slai/student-recording-screen"

const meta: Meta<typeof StudentRecordingScreen> = {
  title: "SLAI/StudentRecordingScreen",
  component: StudentRecordingScreen,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    groupName: "bbb",
    students: ["Student 1", "Student 2"],
  },
}

export default meta
type Story = StoryObj<typeof StudentRecordingScreen>

export const Default: Story = {}

export const NoRoster: Story = {
  args: { students: [] },
}
