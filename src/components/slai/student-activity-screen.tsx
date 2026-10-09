"use client"

import * as React from "react"
import {
  LogOutIcon,
  MicIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
  Trash2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import { useControllableState } from "@/lib/use-controllable-state"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import { InsightCallout } from "@/components/slai/insight-callout"
import type { RecordingState } from "@/components/slai/recording-control"
import { RecordingTimer } from "@/components/slai/recording-timer"
import { SessionStatusBadge } from "@/components/slai/session-status-badge"

/**
 * The student's screen when the session has an activity: the activity fills
 * the phone, and a compact bar on top carries the group and the recording
 * controls (timer, record / stop, pause). It follows StudentRecordingScreen:
 * while a recording is in progress the bar shows its status and Discard
 * (confirmed first) instead of Leave, so a student can't leave mid-recording.
 *
 * Drive it from your recorder with `state`, `seconds` and the recording
 * events; without `state` it keeps its own state and clock (stories).
 */
function StudentActivityScreen({
  groupName,
  students = [],
  activityName,
  state: stateProp,
  defaultState = "idle",
  seconds: secondsProp,
  status,
  noAudioDetected = false,
  onStart,
  onStop,
  onPause,
  onResume,
  onDiscard,
  onLeave,
  children,
  className,
}: {
  groupName: string
  students?: string[]
  /** Shown in the bar on larger screens */
  activityName?: string
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
  /** Adds "Discard" (with a confirmation) while recording */
  onDiscard?: () => void
  /** Leave the group; offered only while not recording */
  onLeave?: () => void
  /** The activity, e.g. an ActivityViewer */
  children: React.ReactNode
  className?: string
}) {
  const [state, setState] = useControllableState<RecordingState>({
    value: stateProp,
    defaultValue: defaultState,
  })
  const [elapsed, setElapsed] = React.useState(0)
  const inProgress = state !== "idle"
  const busy = status !== undefined

  // Without `seconds`, keep a clock of our own (stories, prototypes).
  React.useEffect(() => {
    if (secondsProp !== undefined || state !== "recording") return
    const id = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(id)
  }, [secondsProp, state])
  const seconds = secondsProp ?? (inProgress ? elapsed : 0)

  const start = () => {
    setElapsed(0)
    setState("recording")
    onStart?.()
  }
  const stop = () => {
    setState("idle")
    onStop?.()
  }
  const togglePause = () => {
    if (state === "recording") {
      setState("paused")
      onPause?.()
    } else {
      setState("recording")
      onResume?.()
    }
  }

  return (
    <div
      data-slot="student-activity-screen"
      className={cn("flex h-svh flex-col overflow-hidden", className)}
    >
      <div className="flex shrink-0 items-center gap-2 border-b px-4 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <h1 className="truncate text-title">{groupName}</h1>
          {students.length > 0 && (
            <AvatarGroup className="hidden sm:flex">
              {students.map((name, index) => (
                <Avatar key={`${name}-${index}`} size="sm" title={name}>
                  <AvatarFallback>{initials(name)}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          )}
          {activityName && (
            <span className="hidden truncate text-sm text-muted-foreground md:inline">
              · {activityName}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {inProgress && (
            <SessionStatusBadge
              status={state}
              className="hidden sm:inline-flex"
            />
          )}
          <RecordingTimer
            seconds={seconds}
            compact
            className={cn(!inProgress && "text-muted-foreground")}
          />
          {inProgress && (
            <Button
              variant="outline"
              size="icon-sm"
              disabled={busy}
              onClick={togglePause}
              aria-label={
                state === "recording" ? "Pause recording" : "Resume recording"
              }
            >
              {state === "recording" ? <PauseIcon /> : <PlayIcon />}
            </Button>
          )}
          <Button
            variant={inProgress ? "destructive" : "default"}
            size="icon-sm"
            disabled={busy}
            onClick={inProgress ? stop : start}
            aria-label={inProgress ? "Stop recording" : "Start recording"}
          >
            {busy ? <Spinner /> : inProgress ? <SquareIcon /> : <MicIcon />}
          </Button>
          {inProgress
            ? onDiscard && (
                <ConfirmDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={busy}
                      aria-label="Discard recording"
                      className="text-muted-foreground"
                    >
                      <Trash2Icon />
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
              )
            : onLeave && (
                <Button variant="ghost" size="sm" onClick={onLeave}>
                  <LogOutIcon data-icon="inline-start" />
                  Leave
                </Button>
              )}
        </div>
      </div>

      {noAudioDetected && state === "recording" && (
        <div className="shrink-0 border-b px-4 py-2">
          <InsightCallout variant="warning" title="No audio detected">
            Your microphone may be muted or using the wrong input. Check your
            device settings.
          </InsightCallout>
        </div>
      )}

      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

export { StudentActivityScreen }
