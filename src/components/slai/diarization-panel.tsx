"use client"

import * as React from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { formatElapsed } from "@/lib/format"

export type DiarizationState = "idle" | "loading" | "error" | "empty" | "ready"

/**
 * Speakers tab of a recording: one "Speakers" card holding `form` (a
 * SpeakerForm) and the stage of the analysis (not started, analyzing,
 * failed, no speech). Once `state` is `ready`, `children` follow the form as
 * subsections divided by separators — pass the `embedded` variants of
 * ContributionPanel / ParticipationCard and RecordedTranscriptCard. The card's
 * content scrolls, so give the panel a bounded height.
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
  const sections = React.Children.toArray(children)

  return (
    <Card
      data-slot="diarization-panel"
      data-state={state}
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <CardHeader>
        <CardTitle>Speakers</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-4 px-(--card-spacing) py-1">
            {state !== "loading" && form}

            {state === "ready" &&
              sections.map((section, index) => (
                <React.Fragment key={index}>
                  <Separator className={index === 0 ? "mt-1" : "my-1"} />
                  {section}
                </React.Fragment>
              ))}

            {state === "idle" && (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <AudioLinesIcon />
                  </EmptyMedia>
                  <EmptyTitle>Identify who said what</EmptyTitle>
                  <EmptyDescription>
                    Analyze the recording to separate speakers and see how much
                    each student contributed.
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
                    The analysis finished but found no speakers in this
                    recording.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { DiarizationPanel }
