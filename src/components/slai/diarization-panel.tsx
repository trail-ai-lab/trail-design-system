"use client"

import { AudioLinesIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { formatElapsed } from "@/lib/format"

export type DiarizationState = "idle" | "loading" | "error" | "empty" | "ready"

/**
 * Speakers tab of a recording. Renders the right surface for each stage of
 * speaker analysis; `form` (a SpeakerForm) is shown in every stage that can
 * start an analysis, and `children` (the contribution panel and transcript)
 * only once `state` is `ready`.
 */
function DiarizationPanel({
  state,
  form,
  elapsedSeconds = 0,
  error,
  onRetry,
  children,
  className,
}: {
  state: DiarizationState
  form?: React.ReactNode
  /** Shown beside the spinner while `loading` */
  elapsedSeconds?: number
  error?: string
  onRetry?: () => void
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="diarization-panel"
      className={cn("flex flex-col gap-4", className)}
    >
      {state !== "loading" && form}

      {state === "idle" && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AudioLinesIcon />
            </EmptyMedia>
            <EmptyTitle>Identify who said what</EmptyTitle>
            <EmptyDescription>
              Analyze the recording to separate speakers and see how much each
              student contributed.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {state === "loading" && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Analyzing speakers…</EmptyTitle>
            <EmptyDescription>
              <span className="tabular-nums">
                {formatElapsed(elapsedSeconds)}
              </span>{" "}
              elapsed. It&apos;s safe to switch tabs while this runs.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {state === "error" && (
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Couldn&apos;t analyze speakers</AlertTitle>
          <AlertDescription>
            {error ?? "Something went wrong. Please try again."}
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-fit"
                onClick={onRetry}
              >
                Try again
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {state === "empty" && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AudioLinesIcon />
            </EmptyMedia>
            <EmptyTitle>No speech detected</EmptyTitle>
            <EmptyDescription>
              The analysis finished but found no speakers in this recording.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {state === "ready" && children}
    </div>
  )
}

export { DiarizationPanel }
