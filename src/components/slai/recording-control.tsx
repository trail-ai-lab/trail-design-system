"use client"

import * as React from "react"
import { MicIcon, PauseIcon, PlayIcon, SquareIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { formatDuration } from "@/lib/format"
import { useControllableState } from "@/lib/use-controllable-state"
import { LiveWaveform } from "@/components/slai/live-waveform"

export type RecordingState = "idle" | "recording" | "paused"

const DEFAULT_CAPTIONS = {
  idle: "Tap to start recording",
  recording: "Recording…",
  paused: "Paused — resume to continue, or stop to finish",
}

/**
 * Shared tap-to-record control: a big timer, a big Start/Stop button, and a
 * Pause/Resume button under it once recording has started. Used by both the
 * teacher's quick recording page and the student recording screen so the two
 * stay in sync.
 *
 * Drive it from your recorder by passing `state` and `seconds` and handling
 * `onStart` / `onStop` / `onPause` / `onResume`. Without `state` it keeps its
 * own state and clock (stories, prototypes); the events fire either way.
 * Pass `audioStream` (the recorder's microphone stream, `null` until it has
 * one) to show a LiveWaveform of the mic level under the timer.
 */
function RecordingControl({
  state: stateProp,
  defaultState = "idle",
  seconds,
  status,
  audioStream,
  pausable = true,
  captions = DEFAULT_CAPTIONS,
  onStart,
  onStop,
  onPause,
  onResume,
  className,
}: {
  /** Controlled recording state, from your recorder */
  state?: RecordingState
  /** Initial state when uncontrolled — useful in Storybook to demonstrate
   * recording/paused without a real interaction. */
  defaultState?: RecordingState
  /** Elapsed recording time from your recorder's clock. Without it the
   * control counts seconds itself while recording. */
  seconds?: number
  /** In-flight phase: "connecting" while starting, "stopping" while saving.
   * Disables the buttons and shows a spinner. */
  status?: "connecting" | "stopping"
  /** The recorder's microphone stream: shows a live waveform under the
   * timer. `null` while there's no stream yet; omit to hide the waveform. */
  audioStream?: MediaStream | null
  /** Show Pause / Resume while recording; turn off when the recorder can't
   * pause (e.g. live transcription). */
  pausable?: boolean
  captions?: { idle: string; recording: string; paused: string }
  onStart?: () => void
  onStop?: () => void
  onPause?: () => void
  onResume?: () => void
  className?: string
}) {
  const [state, setState] = useControllableState<RecordingState>({
    value: stateProp,
    defaultValue: defaultState,
  })
  const [elapsed, setElapsed] = React.useState(0)

  React.useEffect(() => {
    if (seconds !== undefined || state !== "recording") return
    const id = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(id)
  }, [seconds, state])

  const start = () => {
    setElapsed(0)
    setState("recording")
    onStart?.()
  }
  const stop = () => {
    setState("idle")
    setElapsed(0)
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

  const busy = status !== undefined

  return (
    <div
      data-slot="recording-control"
      data-state={state}
      className={cn("flex flex-col items-center gap-6", className)}
    >
      <span
        className={cn(
          "font-heading text-6xl font-bold tracking-tight tabular-nums",
          state === "idle" ? "text-muted-foreground" : "text-foreground"
        )}
      >
        {formatDuration(seconds ?? (state === "idle" ? 0 : elapsed))}
      </span>

      {audioStream !== undefined && (
        <LiveWaveform
          stream={audioStream}
          state={state}
          loading={busy}
          className="max-w-xs"
        />
      )}

      <Button
        type="button"
        size="icon"
        variant={state === "idle" ? "outline" : "destructive"}
        disabled={busy}
        onClick={state === "idle" ? start : stop}
        aria-label={state === "idle" ? "Start recording" : "Stop recording"}
        className="size-24 rounded-full"
      >
        {busy ? (
          <Spinner className="size-8" />
        ) : state === "idle" ? (
          <MicIcon className="size-8" />
        ) : (
          <SquareIcon className="size-8" />
        )}
      </Button>

      {pausable && state !== "idle" && (
        <Button
          type="button"
          variant={state === "paused" ? "default" : "secondary"}
          disabled={busy}
          onClick={togglePause}
          className="rounded-full"
        >
          {state === "recording" ? (
            <PauseIcon data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          {state === "recording" ? "Pause" : "Resume"}
        </Button>
      )}

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {busy
          ? status === "connecting"
            ? "Connecting…"
            : "Stopping…"
          : captions[state]}
      </p>
    </div>
  )
}

export { RecordingControl }
