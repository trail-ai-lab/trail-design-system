"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ClassOverviewGrid } from "@/components/slai/class-overview-grid"
import { InsightCallout } from "@/components/slai/insight-callout"
import { SessionGoalCard } from "@/components/slai/session-goal-card"
import {
  StudentInsightCard,
  type StudentInsight,
} from "@/components/slai/student-insight-card"
import { weakestVerdict } from "@/components/slai/lib/verdict"

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    {children}
  </h3>
)

/**
 * The Goals tab of a session recording: class overview matrix, the session
 * goal, then a card per student with anyone below the bar listed first.
 * `callout` surfaces a group-level note above everything else.
 */
function GoalsPanel({
  goal,
  students,
  standardLabel,
  callout,
  className,
}: {
  goal: {
    languageObjective: string
    standardCode: string
    standardDescription: string
  }
  students: StudentInsight[]
  /** Name of the standard being measured, e.g. "CCSS" or "NGSS" */
  standardLabel: string
  /** Group-level note shown at the top */
  callout?: string
  className?: string
}) {
  const sorted = React.useMemo(() => {
    const failing = (s: StudentInsight) =>
      weakestVerdict([
        s.standard.verdict,
        ...(s.wida ? [s.wida.verdict] : []),
      ]) === "not-yet"
    return [...students].sort((a, b) => Number(failing(b)) - Number(failing(a)))
  }, [students])

  if (students.length === 0) {
    return (
      <p className="p-6 text-sm text-muted-foreground italic">
        No goals data available for this recording.
      </p>
    )
  }

  const counts = {
    total: students.length,
    met: students.filter((s) => s.standard.verdict === "met").length,
    partial: students.filter((s) => s.standard.verdict === "partial").length,
    notYet: students.filter((s) => s.standard.verdict === "not-yet").length,
  }
  const maxTalk = Math.max(...students.map((s) => s.talkTimePct))

  const scrollTo = (id: string) =>
    document
      .getElementById(`student-card-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" })

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {callout && <InsightCallout variant="info">{callout}</InsightCallout>}

      <section className="flex flex-col gap-3">
        <SectionLabel>Class overview</SectionLabel>
        <ClassOverviewGrid
          standardLabel={standardLabel}
          onSelectStudent={scrollTo}
          students={students.map((s) => ({
            id: s.id,
            name: s.name,
            language: s.primaryLanguage,
            wida: s.wida?.verdict ?? null,
            standard: s.standard.verdict,
          }))}
        />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>Session goal</SectionLabel>
        <SessionGoalCard {...goal} counts={counts} />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>Students</SectionLabel>
        {sorted.map((student, index) => (
          <StudentInsightCard
            key={student.id}
            student={student}
            standardLabel={standardLabel}
            maxTalkTimePct={maxTalk}
            defaultOpen={index === 0}
          />
        ))}
      </section>
    </div>
  )
}

export { GoalsPanel }
