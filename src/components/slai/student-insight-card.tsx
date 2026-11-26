"use client"

import * as React from "react"
import { ChevronDownIcon, GlobeIcon, LightbulbIcon } from "lucide-react"

import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
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
  /** Language the term was said in, e.g. "ES"; omit for English */
  language?: string
}

/** A student's own words that back their verdict. */
export interface StudentEvidence {
  quote: string
  /** English translation when the quote is in another language */
  translation?: string
  /** Language the quote was said in, in plain English, e.g. "Spanish";
   * omit for English */
  language?: string
  /** Where it was said, e.g. "4:12" into the recording or "10:42 AM" */
  time?: string
}

export interface StudentInsight {
  id: string
  name: string
  /** e.g. "Spanish"; omit when unknown */
  primaryLanguage?: string
  /** Words the student said; the bar compares students in the group */
  words?: number
  /** @deprecated Use `words`. Share of the group's talk time, 0-100; the
   * bar shows it when `words` is absent. */
  talkTimePct?: number
  standard: {
    /** null when there's no verdict, e.g. they said too little */
    verdict: Verdict | null
    reasoning?: string
    /** Why there's no verdict, e.g. "Said too little to judge" */
    noVerdictReason?: string
  }
  /** WIDA verdict and score, when language proficiency is measured too;
   * null for a native English speaker (a "Native English" badge) */
  wida?: { verdict: Verdict; score: number; reasoning?: string } | null
  evidence?: StudentEvidence[]
  academicTerms?: AcademicTerm[]
  /** Suggested next step for the teacher */
  actionPrompt?: string
  /** How the student connected the topic to their own background */
  culturalContext?: string
  /** @deprecated Use `evidence: [{ quote }]`. */
  transcriptQuote?: string
  /** Free-form teacher or AI note */
  note?: string
}

/** The `id` of a student's card, for scrolling to it. */
export function studentCardId(studentId: string) {
  return `student-card-${studentId}`
}

/**
 * One student's result against the session's standard. Collapsed it shows
 * the name, language, how much they said and the verdict (or why there is
 * none); expanded it adds the reasoning, the quotes that back it, academic
 * terms they used and a next step. Students marked "Not yet" (on the
 * standard or WIDA) get an emphasized border. With nothing to expand, the
 * card doesn't open.
 */
function StudentInsightCard({
  student,
  standardLabel,
  maxWords,
  maxTalkTimePct = 100,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: {
  student: StudentInsight
  /** Name of the standard being measured, e.g. "CCSS" */
  standardLabel: string
  /** Most words any student in the group said; scales the bar. Defaults to
   * this student's own count (a full bar). */
  maxWords?: number
  /** @deprecated Use `words` and `maxWords`. Largest talk-time share in the
   * group; scales the bar for `talkTimePct`. */
  maxTalkTimePct?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const { standard, academicTerms = [] } = student
  const evidence =
    student.evidence ??
    (student.transcriptQuote ? [{ quote: student.transcriptQuote }] : [])
  const hasDetail =
    Boolean(standard.reasoning) ||
    evidence.length > 0 ||
    academicTerms.length > 0 ||
    Boolean(student.actionPrompt) ||
    Boolean(student.culturalContext) ||
    Boolean(student.note)
  const needsAttention =
    weakestVerdict(
      [standard.verdict, student.wida?.verdict].filter(
        (verdict): verdict is Verdict => Boolean(verdict)
      )
    ) === "not-yet"
  // Words said, or (older data) a share of the group's talk time
  const bar =
    student.words !== undefined
      ? {
          share: (student.words / Math.max(1, maxWords ?? student.words)) * 100,
          label: `${student.words} words`,
        }
      : {
          share:
            maxTalkTimePct > 0
              ? ((student.talkTimePct ?? 0) / maxTalkTimePct) * 100
              : 0,
          label: `${student.talkTimePct ?? 0}% of group talk time`,
        }

  return (
    <Collapsible
      open={hasDetail && open}
      onOpenChange={setOpen}
      id={studentCardId(student.id)}
      asChild
    >
      <Card
        data-slot="student-insight-card"
        size="sm"
        className={cn(
          "scroll-mt-2 gap-0 py-0",
          needsAttention && "ring-destructive/40 dark:ring-destructive/40",
          className
        )}
      >
        <CollapsibleTrigger
          disabled={!hasDetail}
          className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 px-(--card-spacing) py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          <Avatar size="sm">
            <AvatarFallback>{initials(student.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{student.name}</span>
          {student.primaryLanguage && (
            <span className="text-xs text-muted-foreground">
              {student.primaryLanguage}
            </span>
          )}
          <Progress
            value={Math.min(100, bar.share)}
            aria-label={bar.label}
            title={bar.label}
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
              student.wida === null && (
                <Badge variant="outline">Native English</Badge>
              )
            )}
            {standard.verdict ? (
              <VerdictBadge
                label={standardLabel}
                verdict={standard.verdict}
                reasoning={standard.reasoning}
              />
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                {standardLabel} · {standard.noVerdictReason ?? "No verdict"}
              </Badge>
            )}
            {hasDetail && (
              <ChevronDownIcon
                aria-hidden
                className={cn(
                  "size-4 text-muted-foreground transition-transform",
                  open && "rotate-180"
                )}
              />
            )}
          </span>
        </CollapsibleTrigger>
        {hasDetail && (
          <CollapsibleContent className="flex flex-col gap-3 border-t border-border px-(--card-spacing) py-3 text-sm">
            {standard.reasoning && <p>{standard.reasoning}</p>}
            {student.culturalContext && (
              <InsightItem
                icon={<GlobeIcon className="text-muted-foreground" />}
                label="Cultural connection"
              >
                {student.culturalContext}
              </InsightItem>
            )}
            {evidence.map((item, index) => (
              <TranscriptQuote
                key={index}
                label={[`${student.name} said`, item.language, item.time]
                  .filter(Boolean)
                  .join(" · ")}
                quote={item.quote}
                translation={item.translation}
              />
            ))}
            {academicTerms.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {academicTerms.map(({ term, language }) => (
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
            )}
            {student.note && (
              <p className="text-xs text-muted-foreground">{student.note}</p>
            )}
            {student.actionPrompt && (
              <InsightItem icon={<LightbulbIcon className="text-info" />}>
                <span className="font-medium">{student.actionPrompt}</span>
              </InsightItem>
            )}
          </CollapsibleContent>
        )}
      </Card>
    </Collapsible>
  )
}

export { StudentInsightCard }
