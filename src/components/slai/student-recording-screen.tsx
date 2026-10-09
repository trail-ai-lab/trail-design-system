"use client"

import { ClockIcon, LogOutIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import { InsightCallout } from "@/components/slai/insight-callout"
import {
  RecordingControl,
  type RecordingState,
} from "@/components/slai/recording-control"
import { SessionStatusBadge } from "@/components/slai/session-status-badge"
import { StudentChip } from "@/components/slai/student-chip"

/**
 * The screen a student sees on their own device while recording: session
 * context and roster up top, the shared tap-to-record control front and
 * center. No teacher shell/sidebar here — this runs standalone on a phone.
 *
 * Drive it from your recorder with `state`, `seconds` and the recording
 * events, like `RecordingControl`. While a recording is in progress the
 * header shows its status and hides Leave, so a student can't walk away
 * mid-recording.
 */
function StudentRecordingScreen({
  groupName,
  sessionName,
  joinedAt,
  students = [],
  state: stateProp,
  defaultState = "idle",
  seconds,
  status,
  noAudioDetected = false,
  onStart,
  onStop,
  onPause,
  onResume,
  onDiscard,
  onLeave,
  className,
}: {
  groupName: string
  /** e.g. "Physics · Period 3 — Aug 21" */
  sessionName?: string
  /** Pre-formatted time the student joined, e.g. "10:32 AM" */
  joinedAt?: string
  students?: string[]
  /** Controlled recording state, from your recorder */
  state?: RecordingState
  /** Initial state when uncontrolled (stories, prototypes) */
  defaultState?: RecordingState
  /** Elapsed recording time from your recorder's clock */
  seconds?: number
  /** In-flight phase: "connecting" while starting, "stopping" while saving */
  status?: "connecting" | "stopping"
  /** The mic has picked up no sound for a while: shows a warning while recording */
  noAudioDetected?: boolean
  onStart?: () => void
  onStop?: () => void
  onPause?: () => void
  onResume?: () => void
  /** Adds "Discard recording" (with a confirmation) while recording */
  onDiscard?: () => void
  /** Leave the group; offered only while not recording */
  onLeave?: () => void
  className?: string
}) {
  const [state, setState] = useControllableState<RecordingState>({
    value: stateProp,
    defaultValue: defaultState,
  })
  const inProgress = state !== "idle"

  return (
    <div
      data-slot="student-recording-screen"
      className={cn("flex min-h-svh flex-col px-6 py-4", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="truncate text-h3">{groupName}</h1>
          {(sessionName || joinedAt) && (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-muted-foreground">
              {sessionName && <span>{sessionName}</span>}
              {joinedAt && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  Joined at {joinedAt}
                </span>
              )}
            </p>
          )}
          {students.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {students.map((name, index) => (
                <StudentChip key={`${name}-${index}`} name={name} />
              ))}
            </div>
          )}
        </div>
        {inProgress ? (
          <SessionStatusBadge status={state} className="shrink-0" />
        ) : (
          <Button variant="ghost" size="sm" onClick={onLeave}>
            <LogOutIcon data-icon="inline-start" />
            Leave
          </Button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {noAudioDetected && state === "recording" && (
          <InsightCallout
            variant="warning"
            title="No audio detected"
            className="w-full max-w-sm"
          >
            Your microphone may be muted or using the wrong input. Check your
            device settings.
          </InsightCallout>
        )}
        <RecordingControl
          state={state}
          seconds={seconds}
          status={status}
          onStart={() => {
            setState("recording")
            onStart?.()
          }}
          onStop={() => {
            setState("idle")
            onStop?.()
          }}
          onPause={() => {
            setState("paused")
            onPause?.()
          }}
          onResume={() => {
            setState("recording")
            onResume?.()
          }}
        />
        {onDiscard && inProgress && (
          <ConfirmDialog
            trigger={
              <Button
                variant="ghost"
                size="sm"
                disabled={status !== undefined}
                className="text-muted-foreground"
              >
                <Trash2Icon data-icon="inline-start" />
                Discard recording
              </Button>
            }
            title="Discard this recording?"
            description="Your current recording will be permanently deleted. Your group can only submit one recording per session, so make sure you're ready before you start again."
            confirmLabel="Discard"
            cancelLabel="Keep recording"
            onConfirm={() => {
              setState("idle")
              onDiscard()
            }}
          />
        )}
      </div>
    </div>
  )
}

export { StudentRecordingScreen }
