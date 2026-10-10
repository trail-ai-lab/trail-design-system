"use client"

import { AudioLinesIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
 * Speakers tab of a recording. Until speakers are found, one "Speakers" card
 * holds `form` (a SpeakerForm) and the stage of the analysis (not started,
 * analyzing, failed, no speech), like the other tabs' cards. Once `state` is
 * `ready`, `form` sits above `children` (the contribution panel and
 * transcript), which bring their own cards.
 */
function DiarizationPanel({
  state,
  form,
  scopeLabel,
  elapsedSeconds = 0,
  error,
  onRetry,
  children,
  className,
}: {
  state: DiarizationState
  form?: React.ReactNode
  /** Label of the active scope, e.g. "Group 1", shown as a badge */
  scopeLabel?: string
  /** Shown beside the spinner while `loading` */
  elapsedSeconds?: number
  error?: string
  onRetry?: () => void
  children?: React.ReactNode
  className?: string
}) {
  if (state === "ready") {
    return (
      <div
        data-slot="diarization-panel"
        className={cn("flex flex-col gap-4", className)}
      >
        {form}
        {children}
      </div>
    )
  }

  return (
    <Card data-slot="diarization-panel" className={cn("flex-1", className)}>
      <CardHeader>
        <CardTitle>Speakers</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
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
          <Empty role="status">
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
      </CardContent>
    </Card>
  )
}

export { DiarizationPanel }
