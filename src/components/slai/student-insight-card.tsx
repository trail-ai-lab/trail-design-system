"use client"

import * as React from "react"
import { ChevronDownIcon, GlobeIcon, LightbulbIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      id={`student-card-${student.id}`}
      className={cn(
        "rounded-2xl border bg-card",
        needsAttention ? "border-destructive/40" : "border-border",
        className
      )}
    >
      <CollapsibleTrigger className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl px-4 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
        <span className="text-sm font-semibold">{student.name}</span>
        <span className="text-xs text-muted-foreground">
          {student.primaryLanguage}
        </span>
        <span
          className="h-1.5 w-20 overflow-hidden rounded-full bg-muted"
          title={`${student.talkTimePct}% of group talk time`}
        >
          <span
            className="block h-full rounded-full bg-primary/60"
            style={{
              width: `${maxTalkTimePct > 0 ? (student.talkTimePct / maxTalkTimePct) * 100 : 0}%`,
            }}
          />
        </span>
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
      <CollapsibleContent className="flex flex-col gap-3 border-t border-border px-4 py-3">
        {student.culturalContext && (
          <div className="flex gap-2 rounded-xl bg-muted p-3 text-sm">
            <GlobeIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Cultural connection
              </p>
              <p>{student.culturalContext}</p>
            </div>
          </div>
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
                    <span className="text-muted-foreground">· {language}</span>
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
          <blockquote className="border-l-2 border-border pl-3">
            <p className="text-xs font-medium text-muted-foreground">
              {student.name} said
            </p>
            <p className="text-sm italic">
              &ldquo;{student.transcriptQuote}&rdquo;
            </p>
          </blockquote>
        )}

        {student.note && (
          <p className="border-t border-border pt-3 text-xs text-muted-foreground">
            {student.note}
          </p>
        )}

        {student.actionPrompt && (
          <div className="flex gap-2 rounded-xl bg-muted p-3 text-sm font-medium">
            <LightbulbIcon className="mt-0.5 size-4 shrink-0 text-status-paused" />
            {student.actionPrompt}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export { StudentInsightCard }
