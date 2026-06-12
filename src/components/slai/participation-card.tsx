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

export interface ParticipationEntry {
  name: string
  /** Share of speaking turns, 0–100 */
  percent: number
  /** Number of speaking turns */
  turns: number
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Per-student share of the conversation, derived from the diarized
 * transcript — a labelled horizontal bar for each speaker.
 */
function ParticipationCard({
  students,
  scopeLabel,
  className,
}: {
  students: ParticipationEntry[]
  /** Label of the active scope, e.g. "Group 1" */
  scopeLabel?: string
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Participation</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {students.map((student) => (
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
              <Progress value={student.percent} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { ParticipationCard }
