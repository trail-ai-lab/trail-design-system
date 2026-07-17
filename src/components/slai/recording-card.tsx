"use client"

import { cn } from "@/lib/utils"
import { RecordingControl } from "@/components/slai/recording-control"

/**
 * Recorder for a quick, standalone recording: the shared tap-to-record
 * control, plus room to attach an activity for students to interact with
 * while recording. Live transcription / translation live in the Language
 * settings sheet, opened from the page toolbar.
 */
function RecordingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex w-full flex-col items-center gap-8", className)}
    >
      <RecordingControl />

      <p className="text-center text-sm text-muted-foreground">
        Optionally add an activity for students to interact with while
        recording.
      </p>
    </div>
  )
}

export { RecordingCard }
