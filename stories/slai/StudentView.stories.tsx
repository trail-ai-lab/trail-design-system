import type * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardContent } from "@/components/ui/card"
import { GroupSetupForm } from "@/components/slai/group-setup-form"
import { MicPermissionError } from "@/components/slai/mic-permission-error"
import {
  RecordingDonePanel,
  RecordingUploadingPanel,
  UploadErrorPanel,
} from "@/components/slai/recording-panels"
import { StudentRecordingScreen } from "@/components/slai/student-recording-screen"
import { useSimulatedAudioStream } from "./_simulated-audio"

/**
 * Opens on a student's own device after scanning the session QR code or
 * following the join link — no teacher shell/sidebar, just the task at hand.
 */
function StudentGroupSetupPage() {
  return (
    <div className="flex min-h-svh items-center-safe justify-center bg-background px-4 py-12">
      <GroupSetupForm className="w-full max-w-sm" />
    </div>
  )
}

/**
 * A status card for the mic-blocked, saving, saved and failed steps, framed like the
 * Showcase's "Syncing your accounts" card: the panel brings its own icon,
 * title and description.
 */
function StudentStatusPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh items-center-safe justify-center bg-background p-(--shell-gap)">
      <Card className="w-full max-w-sm">
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  )
}

/** Blocks recording until the student grants microphone permission. */
function StudentMicBlockedPage() {
  return (
    <StudentStatusPage>
      <MicPermissionError className="p-4" />
    </StudentStatusPage>
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
/** Tap to record; the waveform follows a simulated voice (click the page if it stays flat). */
export const Recording: Story = {
  render: function RecordingStory() {
    const stream = useSimulatedAudioStream()
    return (
      <StudentRecordingScreen
        groupName="Team Alpha"
        sessionName="Physics · Period 3 — Aug 21"
        joinedAt="10:32 AM"
        students={["Student 1", "Student 2"]}
        audioStream={stream}
        onDiscard={() => {}}
      />
    )
  },
}

/** After Stop: the recording uploads. Retry progress stays hidden from students. */
export const Saving: Story = {
  render: () => (
    <StudentStatusPage>
      <RecordingUploadingPanel
        attempt={2}
        totalAttempts={4}
        showAttempts={false}
      />
    </StudentStatusPage>
  ),
}

/** Upload finished: the student can close the window. Joining as a new group is only a fallback. */
export const Saved: Story = {
  render: () => (
    <StudentStatusPage>
      <RecordingDonePanel
        name="Team Alpha"
        durationSeconds={754}
        sizeBytes={4_400_000}
        note="You may now close this window. Each group can only submit one recording per session."
        actionLabel="Join as a new group"
        actionVariant="outline"
        onAction={() => {}}
      />
    </StudentStatusPage>
  ),
}

/** Upload failed: retry keeps the recording; discard confirms first. */
export const SaveFailed: Story = {
  render: () => (
    <StudentStatusPage>
      <UploadErrorPanel
        message="The connection dropped before the upload finished."
        onRetryUpload={() => {}}
        onDiscard={() => {}}
      />
    </StudentStatusPage>
  ),
}
