"use client"

import * as React from "react"
import { MicIcon, PauseIcon, PlayIcon, SquareIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatDuration } from "@/components/slai/lib/format"

type RecordingState = "idle" | "recording" | "paused"

/**
 * Shared tap-to-record control: a big timer, a big Start/Stop button, and a
 * smaller Pause/Resume button once recording has started. Used by both the
 * teacher's Quick Recording card and the student recording screen so the
 * two stay in sync.
 */
function RecordingControl({
  captions = {
    idle: "Tap to Record",
    recording: "Recording...",
    paused: "Paused — tap to resume",
  },
  defaultState = "idle",
  className,
}: {
  captions?: { idle: string; recording: string; paused: string }
  /** Seeds the initial state — useful in Storybook to demonstrate
   * recording/paused without a real interaction. Real usage always starts
   * idle. */
  defaultState?: RecordingState
  className?: string
}) {
  const [state, setState] = React.useState<RecordingState>(defaultState)
  const [elapsed, setElapsed] = React.useState(0)

  React.useEffect(() => {
    if (state !== "recording") return
    const id = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(id)
  }, [state])

  const stop = () => {
    setState("idle")
    setElapsed(0)
  }

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <span
        className={cn(
          "font-heading text-6xl font-bold tracking-tight tabular-nums",
          state === "idle" ? "text-muted-foreground/25" : "text-foreground"
        )}
      >
        {formatDuration(elapsed)}
      </span>

      <div className="flex items-center gap-4">
        {state !== "idle" && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() =>
              setState((current) =>
                current === "recording" ? "paused" : "recording"
              )
            }
            aria-label={
              state === "recording" ? "Pause recording" : "Resume recording"
            }
            className="size-14 rounded-full"
          >
            {state === "recording" ? (
              <PauseIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5" />
            )}
          </Button>
        )}

        <Button
          type="button"
          size="icon"
          variant={state === "idle" ? "outline" : "destructive"}
          onClick={state === "idle" ? () => setState("recording") : stop}
          aria-label={state === "idle" ? "Start recording" : "Stop recording"}
          className="size-24 rounded-full"
        >
          {state === "idle" ? (
            <MicIcon className="size-8" />
          ) : (
            <SquareIcon className="size-8" />
          )}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {state === "idle"
          ? captions.idle
          : state === "recording"
            ? captions.recording
            : captions.paused}
      </p>
    </div>
  )
}

export { RecordingControl }
