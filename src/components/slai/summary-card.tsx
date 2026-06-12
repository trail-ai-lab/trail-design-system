"use client"

import { CheckCheckIcon, RefreshCwIcon } from "lucide-react"

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
import { Skeleton } from "@/components/ui/skeleton"

/**
 * AI summary of the live transcript. The scope (a single group or all
 * groups) is driven by the workspace GroupSwitcher and shown as a badge.
 */
function SummaryCard({
  scopeLabel,
  summary,
  loading = false,
  onRegenerate,
  onCheckIn,
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
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        ) : summary ? (
          <p className="text-sm leading-relaxed text-foreground">{summary}</p>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground italic">
            Generate a summary of what {scopeLabel ?? "the class"} has discussed
            so far.
          </p>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={loading}
        >
          <RefreshCwIcon data-icon="inline-start" />
          {summary ? "Regenerate" : "Generate"}
        </Button>
        {onCheckIn && (
          <Button variant="ghost" size="sm" onClick={onCheckIn}>
            <CheckCheckIcon data-icon="inline-start" />
            Check in
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export { SummaryCard }
