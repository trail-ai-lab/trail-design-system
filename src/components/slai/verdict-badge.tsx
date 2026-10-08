"use client"

import { AlertTriangleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  StatusBadge,
  type StatusTone,
} from "@/components/patterns/status-badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { VERDICT_LABELS, type Verdict } from "@/components/slai/lib/verdict"

const verdictConfig: Record<
  Verdict,
  // `text` colors the bare icon (VerdictIcon); badges get their tint from StatusBadge.
  { icon: typeof CheckCircle2Icon; text: string }
> = {
  met: {
    icon: CheckCircle2Icon,
    text: "text-success",
  },
  partial: {
    icon: AlertTriangleIcon,
    text: "text-warning",
  },
  "not-yet": {
    icon: XCircleIcon,
    text: "text-destructive",
  },
}

const verdictTone: Record<Verdict, StatusTone> = {
  met: "success",
  partial: "warning",
  "not-yet": "destructive",
}

/** Icon alone, for compact grids. Color and shape both carry the verdict. */
function VerdictIcon({
  verdict,
  className,
}: {
  verdict: Verdict
  className?: string
}) {
  const { icon: Icon, text } = verdictConfig[verdict]
  return (
    <Icon
      role="img"
      aria-label={VERDICT_LABELS[verdict]}
      className={cn("size-4 shrink-0", text, className)}
    />
  )
}

/**
 * Pill summarizing a verdict for one measure, e.g. "WIDA · Partial 3.2" or
 * "CCSS · Met". Pass `reasoning` to explain the verdict in a tooltip.
 */
function VerdictBadge({
  label,
  verdict,
  score,
  note,
  reasoning,
  className,
}: {
  label: string
  verdict: Verdict
  /** Numeric score shown after the verdict, e.g. a WIDA level */
  score?: number
  /** Short annotation, e.g. "in Spanish" */
  note?: string
  /** Explanation shown on hover */
  reasoning?: string
  className?: string
}) {
  const { icon: Icon } = verdictConfig[verdict]
  const badge = (
    <StatusBadge
      tone={verdictTone[verdict]}
      icon={Icon}
      data-slot="verdict-badge"
      className={className}
    >
      <span className="tracking-wide uppercase">{label}</span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span>{VERDICT_LABELS[verdict]}</span>
      {score !== undefined && (
        <span className="font-normal tabular-nums">{score.toFixed(1)}</span>
      )}
      {note && <span className="font-normal italic">({note})</span>}
    </StatusBadge>
  )

  if (!reasoning) return badge
  // Own provider so the badge works without an app-level TooltipProvider.
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="max-w-64">
          <p className="font-medium">{label} reasoning</p>
          <p>{reasoning}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/** Legend explaining the three verdict icons. */
function VerdictLegend({ className }: { className?: string }) {
  return (
    <div
      data-slot="verdict-legend"
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
        className
      )}
    >
      {(["met", "partial", "not-yet"] as const).map((verdict) => (
        <span key={verdict} className="flex items-center gap-1">
          <VerdictIcon verdict={verdict} className="size-3.5" />
          {VERDICT_LABELS[verdict]}
        </span>
      ))}
    </div>
  )
}

export { VerdictBadge, VerdictIcon, VerdictLegend }
