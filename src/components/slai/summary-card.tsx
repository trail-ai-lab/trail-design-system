"use client"

import {
  CheckCheckIcon,
  ChevronDownIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
  FileTextIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { SummaryText } from "@/components/slai/summary-text"

export interface SummaryPhase {
  id: string
  /** Time of the check-in that closed this phase, e.g. "10:42 AM" */
  checkinAt: string
  summary: string
}

/**
 * AI summary of the live transcript. The scope (a single group or all
 * groups) is driven by the workspace GroupSwitcher and shown as a badge;
 * Generate / Regenerate sits beside it, like TranscriptCard's header action.
 */
function SummaryCard({
  scopeLabel,
  summary,
  loading = false,
  onRegenerate,
  onCheckIn,
  checkingIn = false,
  since,
  thinSummaryTurns,
  earlierPhases = [],
  className,
}: {
  /** Label of the active scope, e.g. "Group 1" or "All groups" */
  scopeLabel?: string
  /** Generated summary text; empty shows the placeholder */
  summary?: string
  loading?: boolean
  onRegenerate?: () => void
  /** Quick comprehension check-in across groups */
  onCheckIn?: () => void
  /** Check-in request in flight */
  checkingIn?: boolean
  /** Time the current summary window started, e.g. "10:42 AM" */
  since?: string
  /** Turn count since the last check-in; a small number shows a thin-data warning */
  thinSummaryTurns?: number
  /** Summaries from before earlier check-ins, newest first */
  earlierPhases?: SummaryPhase[]
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardAction className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={loading}
          >
            <RefreshCwIcon data-icon="inline-start" />
            {summary ? "Regenerate" : "Generate"}
          </Button>
          {scopeLabel && <Badge variant="secondary">{scopeLabel}</Badge>}
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1" aria-live="polite" aria-busy={loading}>
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        ) : summary ? (
          <div className="flex flex-col gap-3">
            {since && (
              <Badge variant="outline" className="w-fit text-muted-foreground">
                Since {since}
              </Badge>
            )}
            {thinSummaryTurns !== undefined && (
              <p className="flex items-center gap-1.5 text-xs text-warning">
                <TriangleAlertIcon className="size-3.5" />
                Only {thinSummaryTurns} turns since the last check-in — the
                summary may be thin.
              </p>
            )}
            <SummaryText text={summary} />
          </div>
        ) : (
          <Empty className="p-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileTextIcon />
              </EmptyMedia>
              <EmptyTitle>No summary yet</EmptyTitle>
              <EmptyDescription>
                Generate a summary of what {scopeLabel ?? "the class"}{" "}
                discussed.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {earlierPhases.length > 0 && (
          <Collapsible className="mt-4 border-t border-border pt-3">
            <CollapsibleTrigger className="group/phases flex w-full items-center gap-1.5 text-xs font-medium text-muted-foreground outline-none hover:text-foreground">
              <ChevronDownIcon className="size-3.5 transition-transform group-data-[state=open]/phases:rotate-180" />
              {earlierPhases.length} earlier{" "}
              {earlierPhases.length === 1 ? "phase" : "phases"}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 flex flex-col gap-3">
              {earlierPhases.map((phase) => (
                <div key={phase.id} className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    Before {phase.checkinAt}
                  </span>
                  <SummaryText
                    text={phase.summary}
                    className="line-clamp-3 text-muted-foreground"
                  />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      {onCheckIn && (
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCheckIn}
            disabled={checkingIn}
          >
            {checkingIn ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <CheckCheckIcon data-icon="inline-start" />
            )}
            {checkingIn ? "Checking in…" : "Check in"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export { SummaryCard }
