import type { Meta, StoryObj } from "@storybook/react-vite"

import { StudentRecordingScreen } from "@/components/slai/student-recording-screen"

const meta: Meta<typeof StudentRecordingScreen> = {
  title: "SLAI/StudentRecordingScreen",
  component: StudentRecordingScreen,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    groupName: "bbb",
    sessionName: "Physics · Period 3 — Aug 21",
    joinedAt: "10:32 AM",
    students: ["Student 1", "Student 2"],
    onDiscard: () => {},
  },
}

export default meta
type Story = StoryObj<typeof StudentRecordingScreen>

/** Before recording: Leave is offered. Tap the button to start. */
export const Default: Story = {}

/** Recording: the header shows the status instead of Leave; Discard asks first. */
export const Recording: Story = {
  args: { defaultState: "recording", seconds: 754 },
}

export const Paused: Story = {
  args: { defaultState: "paused", seconds: 754 },
}

/** The recorder reports silence: a warning above the controls while recording. */
export const NoAudioDetected: Story = {
  args: { defaultState: "recording", seconds: 95, noAudioDetected: true },
}

export const Stopping: Story = {
  args: { defaultState: "recording", seconds: 754, status: "stopping" },
}

export const NoRoster: Story = {
  args: { students: [] },
}
