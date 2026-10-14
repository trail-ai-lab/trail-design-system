"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import { SectionLabel } from "@/components/patterns/section-label"

export interface ParticipationEntry {
  name: string
  /** Share of speaking turns, 0–100 */
  percent: number
  /** Number of speaking turns */
  turns: number
}

/**
 * Per-student share of the conversation, derived from the diarized
 * transcript — a labelled horizontal bar for each speaker. `embedded`
 * renders it as a labelled subsection with no card chrome (and no scope
 * badge — the containing card shows it), for use inside DiarizationPanel.
 */
function ParticipationCard({
  students,
  scopeLabel,
  variant = "card",
  className,
}: {
  students: ParticipationEntry[]
  /** Label of the active scope, e.g. "Group 1" */
  scopeLabel?: string
  variant?: "card" | "embedded"
  className?: string
}) {
  const rows = students.map((student) => (
    <div key={student.name} className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>{initials(student.name)}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="truncate font-medium text-foreground">
            {student.name}
          </span>
          <span className="shrink-0 text-muted-foreground tabular-nums">
            {student.percent}% · {student.turns} turns
          </span>
        </div>
        <Progress
          value={student.percent}
          aria-label={`${student.name}: ${student.percent}% of speaking turns`}
        />
      </div>
    </div>
  ))

  if (variant === "embedded") {
    return (
      <section
        data-slot="participation-card"
        data-variant={variant}
        className={cn("flex flex-col gap-3", className)}
      >
        <SectionLabel>Participation</SectionLabel>
        <div className="flex flex-col gap-4">{rows}</div>
      </section>
    )
  }

  return (
    <Card
      data-slot="participation-card"
      data-variant={variant}
      className={className}
    >
      <CardHeader>
        <CardTitle>Participation</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{rows}</CardContent>
    </Card>
  )
}

export { ParticipationCard }
