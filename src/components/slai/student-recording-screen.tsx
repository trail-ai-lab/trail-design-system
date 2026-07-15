"use client"

import * as React from "react"
import { LogOutIcon, MicIcon, PauseIcon, PlayIcon, SquareIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StudentChip } from "@/components/slai/student-chip"

type RecordingState = "idle" | "recording" | "paused"

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return [h, m, s].map((value) => value.toString().padStart(2, "0")).join(":")
}

/**
 * The screen a student sees on their own device while recording: their
 * group's roster up top, a big tap-to-record button front and center. No
 * teacher shell/sidebar here — this runs standalone on a phone.
 */
function StudentRecordingScreen({
  groupName,
  students = [],
  onLeave,
  className,
}: {
  groupName: string
  students?: string[]
  onLeave?: () => void
  className?: string
}) {
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
    <div className={cn("flex min-h-svh flex-col px-6 py-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            SLAI
          </span>
          <h1 className="font-heading text-xl font-semibold">{groupName}</h1>
          {students.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {students.map((name, index) => (
                <StudentChip key={`${name}-${index}`} name={name} />
              ))}
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onLeave}>
          <LogOutIcon data-icon="inline-start" />
          Leave
        </Button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <span
          className={cn(
            "font-heading text-6xl font-semibold tracking-tight tabular-nums",
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
            aria-label={
              state === "idle" ? "Start recording" : "Stop recording"
            }
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
            ? "Tap to start recording"
            : state === "recording"
              ? "Tap to pause recording"
              : "Paused — tap to resume"}
        </p>
      </div>
    </div>
  )
}

export { StudentRecordingScreen }
