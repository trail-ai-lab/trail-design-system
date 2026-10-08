"use client"

import * as React from "react"
import { CheckIcon, LightbulbIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InsightItem, TranscriptQuote } from "@/components/slai/insight-blocks"
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
    <Card
      size="sm"
      className={cn(
        "w-72 shrink-0",
        isLatest && "ring-primary/40 dark:ring-primary/40",
        className
      )}
    >
      <CardHeader className="gap-1.5">
        <CardTitle className="text-body-sm">{session.sessionLabel}</CardTitle>
        {(session.isMilestone || isLatest) && (
          <div className="flex flex-wrap gap-1">
            {session.isMilestone && (
              <Badge variant="secondary" className="bg-info/10 text-info">
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
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-1">
          {wida ? (
            <VerdictBadge
              label="WIDA"
              verdict={wida}
              score={session.widaScore ?? undefined}
              note={session.widaNote}
            />
          ) : (
            <Badge variant="outline">Native English</Badge>
          )}
          <VerdictBadge
            label={standardLabel}
            verdict={session.standardVerdict}
          />
        </div>

        <Separator />

        <TranscriptQuote
          label="Said"
          quote={session.transcriptQuote}
          translation={session.quoteTranslation}
        />

        <InsightItem icon={<LightbulbIcon className="text-info" />}>
          <span className="font-medium">{session.actionPrompt}</span>
        </InsightItem>

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
      </CardContent>
    </Card>
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
    <div
      data-slot="session-evidence-strip"
      // A horizontal scroller clips on both axes: the inset (cancelled by the
      // negative margin) keeps the cards' ring and shadow visible.
      className={cn(
        "-mx-1 -mt-1 flex gap-3 overflow-x-auto px-1 pt-1 pb-3",
        className
      )}
    >
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
