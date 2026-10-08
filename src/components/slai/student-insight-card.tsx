"use client"

import * as React from "react"
import { ChevronDownIcon, GlobeIcon, LightbulbIcon } from "lucide-react"

import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { InsightItem, TranscriptQuote } from "@/components/slai/insight-blocks"
import { VerdictBadge } from "@/components/slai/verdict-badge"
import { weakestVerdict, type Verdict } from "@/components/slai/lib/verdict"

export interface AcademicTerm {
  term: string
  /** Language code the term was said in, e.g. "ES" */
  language?: string
}

export interface StudentInsight {
  id: string
  name: string
  primaryLanguage: string
  /** Share of the group's talk time, 0-100 */
  talkTimePct: number
  /** WIDA verdict and score; null for native English speakers */
  wida: { verdict: Verdict; score: number; reasoning?: string } | null
  standard: { verdict: Verdict; reasoning?: string }
  culturalContext?: string
  academicTerms?: AcademicTerm[]
  transcriptQuote?: string
  /** Free-form teacher or AI note */
  note?: string
  /** Suggested next step for the teacher */
  actionPrompt?: string
}

/**
 * One student's insights for a session. Collapsed it shows the name, language,
 * a talk-time bar and both verdicts; expanded it adds the cultural
 * connection, academic language used, a transcript quote and a next step.
 * A student below the bar on any measure gets an emphasized border.
 */
function StudentInsightCard({
  student,
  standardLabel,
  maxTalkTimePct = 100,
  defaultOpen = false,
  className,
}: {
  student: StudentInsight
  standardLabel: string
  /** Largest talk-time share in the group; scales the talk-time bar */
  maxTalkTimePct?: number
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const verdicts = [
    student.standard.verdict,
    ...(student.wida ? [student.wida.verdict] : []),
  ]
  const needsAttention = weakestVerdict(verdicts) === "not-yet"

  const talkShare =
    maxTalkTimePct > 0 ? (student.talkTimePct / maxTalkTimePct) * 100 : 0

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      id={`student-card-${student.id}`}
      asChild
    >
      <Card
        size="sm"
        className={cn(
          "gap-0 py-0",
          needsAttention && "ring-destructive/40 dark:ring-destructive/40",
          className
        )}
      >
        <CollapsibleTrigger className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 px-(--card-spacing) py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
          <Avatar size="sm">
            <AvatarFallback>{initials(student.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{student.name}</span>
          <span className="text-xs text-muted-foreground">
            {student.primaryLanguage}
          </span>
          <Progress
            value={talkShare}
            aria-label={`${student.talkTimePct}% of group talk time`}
            title={`${student.talkTimePct}% of group talk time`}
            className="h-1.5 w-20"
          />
          <span className="ml-auto flex flex-wrap items-center gap-1.5">
            {student.wida ? (
              <VerdictBadge
                label="WIDA"
                verdict={student.wida.verdict}
                score={student.wida.score}
                reasoning={student.wida.reasoning}
              />
            ) : (
              <Badge variant="outline">Native English</Badge>
            )}
            <VerdictBadge
              label={standardLabel}
              verdict={student.standard.verdict}
              reasoning={student.standard.reasoning}
            />
            <ChevronDownIcon
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                open && "rotate-180"
              )}
            />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-3 border-t border-border px-(--card-spacing) py-3">
          {student.culturalContext && (
            <InsightItem
              icon={<GlobeIcon className="text-muted-foreground" />}
              label="Cultural connection"
            >
              {student.culturalContext}
            </InsightItem>
          )}

          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-muted-foreground">
              Academic language used
            </p>
            {student.academicTerms && student.academicTerms.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {student.academicTerms.map(({ term, language }) => (
                  <Badge key={term} variant="outline" className="font-mono">
                    &ldquo;{term}&rdquo;
                    {language && (
                      <span className="text-muted-foreground">
                        · {language}
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No academic language detected this session.
              </p>
            )}
          </div>

          {student.transcriptQuote && (
            <TranscriptQuote
              label={`${student.name} said`}
              quote={student.transcriptQuote}
            />
          )}

          {student.note && (
            <p className="border-t border-border pt-3 text-xs text-muted-foreground">
              {student.note}
            </p>
          )}

          {student.actionPrompt && (
            <InsightItem icon={<LightbulbIcon className="text-info" />}>
              <span className="font-medium">{student.actionPrompt}</span>
            </InsightItem>
          )}
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export { StudentInsightCard }
