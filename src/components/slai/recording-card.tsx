"use client"

import * as React from "react"
import { MicIcon, PauseIcon, PlayIcon, SquareIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type RecordingState = "idle" | "recording" | "paused"

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return [h, m, s].map((value) => value.toString().padStart(2, "0")).join(":")
}

/**
 * Recorder for a quick, standalone recording: a big tap-to-record control
 * with pause/stop, plus room to attach an activity for students to interact
 * with while recording. Live transcription / translation live in the
 * Language settings sheet, opened from the page toolbar.
 */
function RecordingCard({ className }: { className?: string }) {
  const [state, setState] = React.useState<RecordingState>("idle")
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
    <div
      className={cn("flex w-full flex-col items-center gap-8", className)}
    >
      <span
        className={cn(
          "font-heading text-7xl font-bold tracking-tight tabular-nums",
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
          ? "Tap to Record"
          : state === "recording"
            ? "Recording..."
            : "Paused — tap to resume"}
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Optionally add an activity for students to interact with while
        recording.
      </p>
    </div>
  )
}

export { RecordingCard }
