import type { Meta, StoryObj } from "@storybook/react-vite"

import { ActivityViewer } from "@/components/slai/activity-viewer"
import { StudentActivityScreen } from "@/components/slai/student-activity-screen"

const ACTIVITY_DOC =
  "<body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'><p>Inclined Plane simulation</p></body>"

const meta: Meta<typeof StudentActivityScreen> = {
  title: "SLAI/StudentActivityScreen",
  component: StudentActivityScreen,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    groupName: "Team Alpha",
    students: ["Student 1", "Student 2"],
    activityName: "Inclined Plane",
    onDiscard: () => {},
    onLeave: () => {},
    children: (
      <ActivityViewer
        title="Inclined Plane"
        srcDoc={ACTIVITY_DOC}
        className="rounded-none ring-0"
      />
    ),
  },
}

export default meta
type Story = StoryObj<typeof StudentActivityScreen>

/** Before recording: Leave is offered. Tap the mic to start. */
export const Default: Story = {}

/** Recording: status, pause, stop and Discard (confirmed) in the bar. */
export const Recording: Story = {
  args: { defaultState: "recording", seconds: 412 },
}

export const Paused: Story = {
  args: { defaultState: "paused", seconds: 412 },
}

/** The recorder reports silence: a warning under the bar. */
export const NoAudioDetected: Story = {
  args: { defaultState: "recording", seconds: 95, noAudioDetected: true },
}

export const Stopping: Story = {
  args: { defaultState: "recording", seconds: 412, status: "stopping" },
}
