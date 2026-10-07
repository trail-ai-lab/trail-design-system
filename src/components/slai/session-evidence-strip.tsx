"use client"

import * as React from "react"
import { CheckIcon, LightbulbIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VerdictBadge } from "@/components/slai/verdict-badge"
import { widaVerdict } from "@/components/slai/lib/verdict"
import type { StudentSessionData } from "@/components/slai/lib/student-progress"

/**
 * One session's evidence for a student: both verdicts, a transcript quote
 * (with a translation for non-English speech), the suggested follow-up and a
 * toggle to mark the follow-up done.
 */
function SessionEvidenceCard({
  session,
  standardLabel,
  isLatest = false,
  onActionDoneChange,
  className,
}: {
  session: StudentSessionData
  standardLabel: string
  isLatest?: boolean
  /** Called when the teacher toggles the follow-up; state starts from `session.actionDone` */
  onActionDoneChange?: (done: boolean) => void
  className?: string
}) {
  const [done, setDone] = React.useState(session.actionDone)
  const wida =
    session.widaScore === null
      ? null
      : (session.widaVerdictOverride ?? widaVerdict(session.widaScore))

  return (
    <div
      className={cn(
        "flex w-72 shrink-0 flex-col gap-3 rounded-2xl border bg-card p-3",
        isLatest ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold">{session.sessionLabel}</p>
        {(session.isMilestone || isLatest) && (
          <div className="flex flex-wrap gap-1">
            {session.isMilestone && (
              <Badge variant="secondary" className="bg-status-paused/10 text-status-paused">
                <StarIcon data-icon="inline-start" />
                {session.milestoneLabel ?? "Milestone"}
              </Badge>
            )}
            {isLatest && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Latest
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {wida ? (
          <VerdictBadge
            label="WIDA"
            verdict={wida}
            score={session.widaScore ?? undefined}
            note={session.widaNote}
          />
        ) : (
          <Badge variant="outline">Native EN</Badge>
        )}
        <VerdictBadge label={standardLabel} verdict={session.standardVerdict} />
      </div>

      <Separator />

      <blockquote className="border-l-2 border-border pl-2">
        <p className="text-xs font-medium text-muted-foreground">Said</p>
        <p className="text-sm italic">&ldquo;{session.transcriptQuote}&rdquo;</p>
        {session.quoteTranslation && (
          <p className="mt-1 text-xs text-muted-foreground italic">
            {session.quoteTranslation}
          </p>
        )}
      </blockquote>

      <div className="flex gap-2 rounded-xl bg-muted p-2.5 text-sm font-medium">
        <LightbulbIcon className="mt-0.5 size-4 shrink-0 text-status-paused" />
        {session.actionPrompt}
      </div>

      <Button
        variant={done ? "secondary" : "outline"}
        size="sm"
        aria-pressed={done}
        onClick={() => {
          setDone(!done)
          onActionDoneChange?.(!done)
        }}
      >
        <CheckIcon data-icon="inline-start" />
        {done ? "Follow-up done" : "Mark follow-up done"}
      </Button>
    </div>
  )
}

/** Horizontally scrolling row of SessionEvidenceCards; the last is "Latest". */
function SessionEvidenceStrip({
  sessions,
  standardLabel,
  className,
}: {
  sessions: StudentSessionData[]
  standardLabel: string
  className?: string
}) {
  return (
    <div className={cn("flex gap-3 overflow-x-auto px-px pb-3", className)}>
      {sessions.map((session, i) => (
        <SessionEvidenceCard
          key={session.sessionId}
          session={session}
          standardLabel={standardLabel}
          isLatest={i === sessions.length - 1}
        />
      ))}
    </div>
  )
}

export { SessionEvidenceCard, SessionEvidenceStrip }
