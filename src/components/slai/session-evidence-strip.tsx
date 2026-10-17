"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  CheckIcon,
  LightbulbIcon,
  StarIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AppLink } from "@/components/patterns/link-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { InsightItem, TranscriptQuote } from "@/components/slai/insight-blocks"
import { VerdictBadge } from "@/components/slai/verdict-badge"
import { widaVerdict } from "@/components/slai/lib/verdict"
import type { StudentSessionData } from "@/components/slai/lib/student-progress"

/** "2m 10s" / "45s" — how long a student spoke. */
function formatTalkTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

/**
 * One session's evidence for a student. Shows what the session has: WIDA and
 * standard verdicts, talk time, a transcript quote (with a translation for
 * non-English speech), a link to the recording, and the suggested follow-up
 * with a toggle to mark it done. An `absent` session is a muted card; a
 * session with no quote yet says so.
 */
function SessionEvidenceCard({
  session,
  standardLabel = "Standard",
  isLatest = false,
  onActionDoneChange,
  className,
}: {
  session: StudentSessionData
  /** Name of the standard on its verdict badge; defaults to "Standard" */
  standardLabel?: string
  isLatest?: boolean
  /** Called when the teacher toggles the follow-up; state starts from `session.actionDone` */
  onActionDoneChange?: (done: boolean) => void
  className?: string
}) {
  const [done, setDone] = React.useState(Boolean(session.actionDone))
  const wida =
    typeof session.widaScore === "number"
      ? (session.widaVerdictOverride ?? widaVerdict(session.widaScore))
      : null
  const hasVerdicts =
    wida !== null ||
    session.widaScore === null ||
    session.standardVerdict !== undefined
  const hasTalkTime =
    session.participationPct !== undefined || session.talkSeconds !== undefined
  const meta = [session.dateLabel, session.groupName]
    .filter(Boolean)
    .join(" · ")
  const quoteLabel = [
    session.quoteLabel ?? "Said",
    session.quoteLanguage && `in ${session.quoteLanguage}`,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Card
      size="sm"
      data-absent={session.absent || undefined}
      className={cn(
        "w-72 shrink-0",
        session.absent && "bg-muted/50 shadow-none",
        isLatest && "ring-primary/40 dark:ring-primary/40",
        className
      )}
    >
      <CardHeader className="gap-1.5">
        <CardTitle className="text-body-sm">{session.sessionLabel}</CardTitle>
        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
        {(session.isMilestone || isLatest || session.absent) && (
          <div className="flex flex-wrap gap-1">
            {session.absent && <Badge variant="outline">Absent</Badge>}
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

      {!session.absent && (
        <CardContent className="flex flex-1 flex-col gap-3">
          {hasVerdicts && (
            <>
              <div className="flex flex-wrap gap-1">
                {wida ? (
                  <VerdictBadge
                    label="WIDA"
                    verdict={wida}
                    score={session.widaScore ?? undefined}
                    note={session.widaNote}
                  />
                ) : (
                  session.widaScore === null && (
                    <Badge variant="outline">Native English</Badge>
                  )
                )}
                {session.standardVerdict && (
                  <VerdictBadge
                    label={standardLabel}
                    verdict={session.standardVerdict}
                  />
                )}
              </div>
              <Separator />
            </>
          )}

          {hasTalkTime && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Talk time</span>
                <span className="tabular-nums">
                  {[
                    session.participationPct !== undefined &&
                      `${Math.round(session.participationPct)}%`,
                    session.talkSeconds !== undefined &&
                      formatTalkTime(session.talkSeconds),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              {session.participationPct !== undefined && (
                <Progress
                  value={session.participationPct}
                  aria-label={`Share of group talk time: ${Math.round(session.participationPct)}%`}
                />
              )}
            </div>
          )}

          {session.transcriptQuote ? (
            <TranscriptQuote
              label={quoteLabel}
              quote={session.transcriptQuote}
              translation={session.quoteTranslation}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No lines yet — assign this student to a speaker in the recording.
            </p>
          )}

          {session.actionPrompt && (
            <>
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
            </>
          )}

          {session.href && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-auto self-start"
              asChild
            >
              <AppLink href={session.href}>
                <AudioLinesIcon data-icon="inline-start" />
                Open recording
              </AppLink>
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}

/**
 * Horizontally scrolling row of SessionEvidenceCards; the last session the
 * student was in is "Latest".
 */
function SessionEvidenceStrip({
  sessions,
  standardLabel,
  className,
}: {
  sessions: StudentSessionData[]
  /** Name of the standard on verdict badges; defaults to "Standard" */
  standardLabel?: string
  className?: string
}) {
  const latest = sessions.filter((s) => !s.absent).slice(-1)[0]
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
      {sessions.map((session) => (
        <SessionEvidenceCard
          key={session.sessionId}
          session={session}
          standardLabel={standardLabel}
          isLatest={session === latest}
        />
      ))}
    </div>
  )
}

export { SessionEvidenceCard, SessionEvidenceStrip }
