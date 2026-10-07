import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import { ArrowLeftIcon, MicIcon, SquareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ActivityViewer } from "@/components/slai/activity-viewer"
import { AppShell } from "@/components/slai/app-shell"
import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import {
  SaveRecordingDialog,
  type SaveRecordingPhase,
} from "@/components/slai/save-recording-dialog"
import { RecordingTimer } from "@/components/slai/recording-timer"
import { SessionStatusBadge } from "@/components/slai/session-status-badge"
import { PageSidebar } from "./_page-fixtures"

function ActivityDetailPage({
  variant,
  name,
}: {
  variant: "iframe" | "vidyamap"
  name: string
}) {
  const [recording, setRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [dialog, setDialog] = React.useState<SaveRecordingPhase | null>(null)

  React.useEffect(() => {
    if (!recording) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [recording])

  const stop = () => {
    setRecording(false)
    setDialog("form")
  }

  const upload = () => {
    setDialog("uploading")
    setTimeout(() => setDialog("done"), 1800)
  }

  return (
    <AppShell
      sidebar={<PageSidebar activeNav="activities" />}
      title={
        <>
          <span className="text-muted-foreground">Activities</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{name}</span>
        </>
      }
      toolbar={
        <>
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon data-icon="inline-start" />
            Back
          </Button>
          <div className="ml-auto flex items-center gap-3">
            {recording && (
              <>
                <SessionStatusBadge status="recording" />
                <RecordingTimer seconds={seconds} compact />
              </>
            )}
            {recording ? (
              <Button variant="destructive" onClick={stop}>
                <SquareIcon data-icon="inline-start" />
                Stop
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSeconds(0)
                  setRecording(true)
                }}
              >
                <MicIcon data-icon="inline-start" />
                Start recording
              </Button>
            )}
          </div>
        </>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col p-(--shell-px)">
        <ActivityViewer
          variant={variant}
          title={name}
          srcDoc="<body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'><p>Activity content</p></body>"
        />
      </div>
      <SaveRecordingDialog
        open={dialog !== null}
        onOpenChange={(open) => !open && setDialog(null)}
        phase={dialog ?? "form"}
        durationSeconds={seconds}
        sizeBytes={seconds * 16_000}
        defaultFilename={`${name.toLowerCase().replace(/\s+/g, "-")}.webm`}
        languageOptions={DEFAULT_LANGUAGES}
        uploadAttempt={1}
        uploadTotalAttempts={4}
        onUpload={upload}
        onDiscard={() => setDialog(null)}
        onNewRecording={() => setDialog(null)}
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/ActivityDetail",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Simulation: Story = {
  render: () => <ActivityDetailPage variant="iframe" name="Inclined Plane" />,
}

export const VidyaMap: Story = {
  render: () => <ActivityDetailPage variant="vidyamap" name="VidyaMap" />,
}
