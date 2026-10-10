"use client"

import {
  CheckCheckIcon,
  ChevronDownIcon,
  HistoryIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
  FileTextIcon,
} from "lucide-react"

import { useControllableState } from "@/lib/use-controllable-state"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { SummaryText } from "@/components/slai/summary-text"

/** A saved summary, for the history menu. */
export interface SummaryVersion {
  id: string
  /** When it was generated, formatted, e.g. "Oct 9, 3:42 PM" */
  label: string
  /** What it covers, e.g. "Check-in" or "Whole session" */
  description?: string
  summary: string
}

/** What a live summary covers: since the latest check-in, or the whole session. */
export type SummaryRange = "since-checkin" | "whole-session"

export interface SummaryPhase {
  id: string
  /** Time of the check-in that closed this phase, e.g. "10:42 AM" */
  checkinAt: string
  summary: string
}

/**
 * AI summary of the live transcript. The scope (a single group or all
 * groups) is driven by the workspace GroupSwitcher and shown as a badge;
 * Summarize sits beside it, like TranscriptCard's header action.
 *
 * `versions` (newest first) adds a history menu: picking an earlier version
 * shows it with a way back to the latest. In a live session, Summarize
 * covers the whole session and `onCheckIn` adds "Check in &
 * summarize" for what was said since the previous check-in; a badge says
 * which one is shown (`range`, with `since` for the check-in time).
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
  versions = [],
  versionId: versionIdProp,
  defaultVersionId = null,
  onVersionIdChange,
  range,
  className,
}: {
  /** Label of the active scope, e.g. "Group 1" or "All groups" */
  scopeLabel?: string
  /** Generated summary text; empty shows the placeholder */
  summary?: string
  loading?: boolean
  /** The "Summarize" button */
  onRegenerate?: () => void
  /** "Check in & summarize": summarize what was said since the previous
   * check-in, then start a new one */
  onCheckIn?: () => void
  /** Check-in request in flight */
  checkingIn?: boolean
  /** Time the current summary window started, e.g. "10:42 AM" */
  since?: string
  /** Turn count since the last check-in; a small number shows a thin-data warning */
  thinSummaryTurns?: number
  /** Summaries from before earlier check-ins, newest first */
  earlierPhases?: SummaryPhase[]
  /** Saved summaries, newest first; two or more add a history menu. The
   * newest is shown as `summary` (which may be translated). */
  versions?: SummaryVersion[]
  /** The version shown (controlled); `null` is the latest */
  versionId?: string | null
  defaultVersionId?: string | null
  onVersionIdChange?: (versionId: string | null) => void
  /** What the shown summary covers, as a badge: "Whole session", or
   * "Since {since}" for a check-in summary */
  range?: SummaryRange
  className?: string
}) {
  const [versionId, setVersionId] = useControllableState<string | null>({
    value: versionIdProp,
    defaultValue: defaultVersionId,
    onChange: onVersionIdChange,
  })
  const latestId = versions[0]?.id
  // An earlier version, while one is picked (the latest shows `summary`).
  const earlier =
    versionId && versionId !== latestId
      ? versions.find((version) => version.id === versionId)
      : undefined
  const shownSummary = earlier?.summary ?? summary
  const coverage =
    range === "whole-session"
      ? "Whole session"
      : since
        ? `Since ${since}`
        : undefined

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardAction className="flex items-center gap-2">
          {versions.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Summary history"
                  disabled={loading}
                >
                  <HistoryIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Summary history</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={earlier?.id ?? latestId}
                  onValueChange={(id) =>
                    setVersionId(id === latestId ? null : id)
                  }
                >
                  {versions.map((version, index) => (
                    <DropdownMenuRadioItem key={version.id} value={version.id}>
                      <span className="flex flex-col">
                        <span className="tabular-nums">{version.label}</span>
                        {version.description && (
                          <span className="text-xs text-muted-foreground">
                            {version.description}
                          </span>
                        )}
                      </span>
                      {index === 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          Latest
                        </Badge>
                      )}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={loading}
          >
            <RefreshCwIcon data-icon="inline-start" />
            Summarize
          </Button>
          {scopeLabel && <Badge variant="secondary">{scopeLabel}</Badge>}
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1" aria-live="polite" aria-busy={loading}>
        {earlier && !loading && (
          <div
            data-slot="summary-earlier-version"
            className="mb-3 flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <HistoryIcon className="size-3.5" />
              Earlier version · {earlier.label}
              {earlier.description && ` · ${earlier.description}`}
            </span>
            <Button
              variant="link"
              size="xs"
              className="h-auto p-0"
              onClick={() => setVersionId(null)}
            >
              Show latest
            </Button>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        ) : shownSummary ? (
          <div className="flex flex-col gap-3">
            {coverage && !earlier && (
              <Badge variant="outline" className="w-fit text-muted-foreground">
                {coverage}
              </Badge>
            )}
            {thinSummaryTurns !== undefined && !earlier && (
              <p className="flex items-center gap-1.5 text-xs text-warning">
                <TriangleAlertIcon className="size-3.5" />
                Only {thinSummaryTurns} turns since the last check-in — the
                summary may be thin.
              </p>
            )}
            <SummaryText text={shownSummary} />
          </div>
        ) : (
          <Empty className="p-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileTextIcon />
              </EmptyMedia>
              <EmptyTitle>No summary yet</EmptyTitle>
              <EmptyDescription>
                Summarize what {scopeLabel ?? "the class"} discussed.
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
            variant="outline"
            size="sm"
            onClick={onCheckIn}
            disabled={checkingIn}
          >
            {checkingIn ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <CheckCheckIcon data-icon="inline-start" />
            )}
            {checkingIn ? "Checking in…" : "Check in & summarize"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export { SummaryCard }
