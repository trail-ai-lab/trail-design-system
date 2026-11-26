"use client"

import * as React from "react"
import { RefreshCwIcon, SparklesIcon, TargetIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { SectionLabel } from "@/components/patterns/section-label"
import { ClassOverviewGrid } from "@/components/slai/class-overview-grid"
import { InsightCallout } from "@/components/slai/insight-callout"
import { SessionGoalCard } from "@/components/slai/session-goal-card"
import {
  StudentInsightCard,
  studentCardId,
  type StudentInsight,
} from "@/components/slai/student-insight-card"

const ORDER = { "not-yet": 0, partial: 1, met: 2 } as const

/** The session's standard, as `GoalsPanel` shows it. */
export interface GoalsPanelGoal {
  /** e.g. "Grade 7 · Ratios and Proportional Relationships" */
  heading: string
  code: string
  description: string
}

/** @deprecated The 3.10 shape of `GoalsPanel`'s `goal`; use `GoalsPanelGoal`. */
export interface LegacyGoalsPanelGoal {
  languageObjective: string
  standardCode: string
  standardDescription: string
}

function toGoal(goal?: GoalsPanelGoal | LegacyGoalsPanelGoal) {
  if (!goal || "heading" in goal) return goal
  return {
    heading: goal.languageObjective,
    code: goal.standardCode,
    description: goal.standardDescription,
  }
}

/** Not yet → Partial → Met → no verdict, then by name. */
function sortStudents(students: StudentInsight[]) {
  return [...students].sort(
    (a, b) =>
      (a.standard.verdict ? ORDER[a.standard.verdict] : 3) -
        (b.standard.verdict ? ORDER[b.standard.verdict] : 3) ||
      a.name.localeCompare(b.name)
  )
}

/** "Annu", "Annu and Mei", "Annu, Mei and Liam". */
function joinNames(names: string[]) {
  return names.length <= 1
    ? (names[0] ?? "")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
}

/**
 * Each student's progress on the session's standard: the class overview,
 * the goal, then a card per student with anyone below the bar first. Used
 * as the Goals tab in Session review (one recording) and in Live (what each
 * group has said so far).
 *
 * Without results it shows why (`blocked`) or a "Check students" button
 * (`onCheck`). `provisional` marks Live results: a "Live · provisional"
 * badge, and a footer saying when they were checked and how many lines came
 * in since (`newLines`).
 */
function GoalsPanel({
  students,
  standardLabel,
  goal: goalProp,
  standardPicker,
  callout,
  blocked,
  onCheck,
  loading = false,
  stale,
  checkedAt,
  newLines,
  provisional = false,
  missingSamples = [],
  className,
}: {
  /** Students with results; empty before the first check */
  students: StudentInsight[]
  /** Name of the standard being measured, e.g. "CCSS" */
  standardLabel: string
  /** The session's standard. The 3.10 shape (`languageObjective`,
   * `standardCode`, `standardDescription`) still works but is deprecated. */
  goal?: GoalsPanelGoal | LegacyGoalsPanelGoal
  /** A `StandardPicker` to choose or change the session's standard, shown
   * first under "Session standard" */
  standardPicker?: React.ReactNode
  /** Group-level note shown above the results */
  callout?: string
  /** Results can't be produced yet, e.g. "No standard yet" */
  blocked?: { title: string; description: string }
  /** Runs the check; shows "Check students" (or "Check again") */
  onCheck?: () => void
  /** A check is running */
  loading?: boolean
  /** Why the results are out of date; shows them with a "Check again" */
  stale?: string
  /** When the results were produced, formatted, e.g. "10:42 AM" */
  checkedAt?: string
  /** Transcript lines added since the last check (Live) */
  newLines?: number
  /** Live results, replaced by the recording's after upload */
  provisional?: boolean
  /** Names of students without a voice sample: their lines aren't named,
   * so they get no verdict */
  missingSamples?: string[]
  className?: string
}) {
  const goal = toGoal(goalProp)
  const sorted = React.useMemo(() => sortStudents(students), [students])
  // Students whose cards are open; the first with a verdict starts open
  const [openIds, setOpenIds] = React.useState<Set<string>>()
  const shownOpen =
    openIds ??
    new Set(
      sorted
        .slice(0, 1)
        .filter((s) => s.standard.verdict)
        .map((s) => s.id)
    )
  const setOpen = (id: string, open: boolean) => {
    const next = new Set(shownOpen)
    if (open) next.add(id)
    else next.delete(id)
    setOpenIds(next)
  }
  const showStudent = (id: string) => {
    setOpen(id, true)
    requestAnimationFrame(() =>
      document
        .getElementById(studentCardId(id))
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    )
  }

  const checkButton = (label: string) =>
    onCheck && (
      <Button onClick={onCheck} disabled={loading}>
        {loading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <SparklesIcon data-icon="inline-start" />
        )}
        {loading ? "Checking…" : label}
      </Button>
    )

  const counts = {
    total: students.length,
    met: students.filter((s) => s.standard.verdict === "met").length,
    partial: students.filter((s) => s.standard.verdict === "partial").length,
    notYet: students.filter((s) => s.standard.verdict === "not-yet").length,
  }
  const maxWords = Math.max(1, ...students.map((s) => s.words ?? 0))
  // Older data: talk-time shares instead of words
  const maxTalkTimePct = Math.max(0, ...students.map((s) => s.talkTimePct ?? 0))

  return (
    <div
      data-slot="goals-panel"
      className={cn("flex flex-col gap-5", className)}
    >
      {standardPicker && (
        <section className="flex flex-col gap-3">
          <SectionLabel>Session standard</SectionLabel>
          {standardPicker}
          <p className="text-xs text-muted-foreground">
            Applies to every group in this session.
          </p>
        </section>
      )}

      {missingSamples.length > 0 && (
        <InsightCallout variant="warning">
          No voice sample for {joinNames(missingSamples)}, so{" "}
          {missingSamples.length === 1 ? "their" : "these students'"} lines
          aren&apos;t named and{" "}
          {missingSamples.length === 1 ? "they get" : "get"} no verdict.
        </InsightCallout>
      )}

      {blocked ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TargetIcon />
            </EmptyMedia>
            <EmptyTitle>{blocked.title}</EmptyTitle>
            <EmptyDescription>{blocked.description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : students.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {onCheck ? <SparklesIcon /> : <TargetIcon />}
            </EmptyMedia>
            <EmptyTitle>
              {onCheck && goal
                ? `Check students against ${goal.code}`
                : "No goals yet"}
            </EmptyTitle>
            <EmptyDescription>
              {!onCheck
                ? "Goal results appear here once the talk has been checked."
                : provisional
                  ? "AI reads what each student has said so far and says whether it shows the standard, with their words as evidence."
                  : "AI reads this recording and says, for each student, whether what they said shows the standard, with their words as evidence."}
            </EmptyDescription>
          </EmptyHeader>
          {onCheck && (
            <EmptyContent>{checkButton("Check students")}</EmptyContent>
          )}
        </Empty>
      ) : null}

      {!blocked && students.length > 0 && (
        <>
          {stale && (
            <Alert>
              <RefreshCwIcon />
              <AlertDescription>{stale}</AlertDescription>
              {onCheck && (
                <AlertAction>
                  <Button size="sm" onClick={onCheck} disabled={loading}>
                    {loading && <Spinner data-icon="inline-start" />}
                    Check again
                  </Button>
                </AlertAction>
              )}
            </Alert>
          )}
          {callout && <InsightCallout variant="info">{callout}</InsightCallout>}

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <SectionLabel>Class overview</SectionLabel>
              {provisional && (
                <Badge variant="outline">Live · provisional</Badge>
              )}
            </div>
            <ClassOverviewGrid
              standardLabel={standardLabel}
              onSelectStudent={showStudent}
              students={sorted.map((s) => ({
                id: s.id,
                name: s.name,
                language: s.primaryLanguage,
                ...(s.wida !== undefined && {
                  wida: s.wida?.verdict ?? null,
                }),
                standard: s.standard.verdict,
              }))}
            />
          </section>

          {goal && (
            <section className="flex flex-col gap-3">
              <SectionLabel>Session goal</SectionLabel>
              <SessionGoalCard
                languageObjective={goal.heading}
                standardCode={goal.code}
                standardDescription={goal.description}
                counts={counts}
              />
            </section>
          )}

          <section className="flex flex-col gap-3">
            <SectionLabel>Students</SectionLabel>
            <div className="flex flex-col gap-2">
              {sorted.map((student) => (
                <StudentInsightCard
                  key={student.id}
                  student={student}
                  standardLabel={standardLabel}
                  maxWords={maxWords}
                  maxTalkTimePct={maxTalkTimePct}
                  open={shownOpen.has(student.id)}
                  onOpenChange={(open) => setOpen(student.id, open)}
                />
              ))}
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              {provisional
                ? [
                    checkedAt && `Checked at ${checkedAt}`,
                    newLines
                      ? `${newLines} new ${newLines === 1 ? "line" : "lines"} since`
                      : undefined,
                  ]
                    .filter(Boolean)
                    .join(" · ") +
                  `${checkedAt || newLines ? ". " : ""}Final results come from the recording after upload.`
                : `AI-generated${checkedAt ? ` ${checkedAt}` : ""}. Check it against the recording before acting on it.`}
            </span>
            {onCheck && !stale && (
              <Button
                size="sm"
                variant={provisional && newLines ? "outline" : "ghost"}
                className="ml-auto"
                onClick={onCheck}
                disabled={loading}
              >
                {loading ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <RefreshCwIcon data-icon="inline-start" />
                )}
                {loading ? "Checking…" : "Check again"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export { GoalsPanel }
