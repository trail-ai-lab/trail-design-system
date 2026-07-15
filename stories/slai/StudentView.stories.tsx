import type { Meta, StoryObj } from "@storybook/nextjs"

import { GroupSetupForm } from "@/components/slai/group-setup-form"
import { MicPermissionError } from "@/components/slai/mic-permission-error"
import { StudentRecordingScreen } from "@/components/slai/student-recording-screen"

/**
 * Opens on a student's own device after scanning the session QR code or
 * following the join link — no teacher shell/sidebar, just the task at hand.
 */
function StudentGroupSetupPage() {
  return (
    <div className="flex min-h-svh justify-center bg-background px-6 py-12">
      <GroupSetupForm className="w-full max-w-sm" />
    </div>
  )
}

/** Blocks recording until the student grants microphone permission. */
function StudentMicBlockedPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-6 py-12">
      <MicPermissionError className="w-full max-w-sm" />
    </div>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/StudentView",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const GroupSetup: Story = { render: () => <StudentGroupSetupPage /> }
export const MicBlocked: Story = { render: () => <StudentMicBlockedPage /> }
export const Recording: Story = {
  render: () => (
    <StudentRecordingScreen
      groupName="bbb"
      sessionName="Physics · Period 3 — Aug 21"
      joinedAt="10:32 AM"
      students={["Student 1", "Student 2"]}
    />
  ),
}
