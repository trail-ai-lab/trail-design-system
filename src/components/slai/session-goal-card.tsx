"use client"

import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

/**
 * The session's learning goal: the standard's code and description plus a
 * one-line tally of how many students met it. Collapsible; open by default.
 */
function SessionGoalCard({
  languageObjective,
  standardCode,
  standardDescription,
  counts,
  defaultOpen = true,
  className,
}: {
  languageObjective: string
  /** e.g. "3.OA.A.2" */
  standardCode: string
  standardDescription: string
  /** Students per outcome, used for the tally sentence */
  counts: { met: number; partial: number; notYet: number; total: number }
  defaultOpen?: boolean
  className?: string
}) {
  const parts = [
    `${counts.met} of ${counts.total} met this goal independently.`,
  ]
  if (counts.partial > 0) parts.push(`${counts.partial} partially met.`)
  if (counts.notYet > 0) parts.push(`${counts.notYet} not yet.`)

  return (
    <Collapsible defaultOpen={defaultOpen} asChild>
      <Card size="sm" className={cn("gap-0 py-0", className)}>
        <CollapsibleTrigger className="group/goal flex w-full items-center gap-2 px-(--card-spacing) py-3 text-left text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
          <Badge variant="secondary">{standardCode}</Badge>
          <span className="flex-1">{languageObjective}</span>
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[state=open]/goal:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1.5 border-t border-border px-(--card-spacing) py-3 text-sm">
          <p>
            <span className="font-medium">{standardCode}:</span>{" "}
            {standardDescription}
          </p>
          <p className="text-muted-foreground">{parts.join(" ")}</p>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export { SessionGoalCard }
