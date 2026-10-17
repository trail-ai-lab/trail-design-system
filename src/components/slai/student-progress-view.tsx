"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/patterns/section-label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightCallout } from "@/components/slai/insight-callout"
import { initials } from "@/lib/format"
import { ProgressChart } from "@/components/slai/progress-chart"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { SessionEvidenceStrip } from "@/components/slai/session-evidence-strip"
import { metricValue } from "@/components/slai/progress-chart"
import { VerdictBadge } from "@/components/slai/verdict-badge"
import { widaLabel } from "@/components/slai/lib/verdict"
import type {
  ProgressMetric,
  StudentProgressData,
} from "@/components/slai/lib/student-progress"

/**
 * A student's progress over time: header with their latest WIDA and
 * standards status, an insight callout, the progress chart with a tab per
 * metric, and the per-session evidence strip. `insight` is the auto-generated sentence;
 * one that starts with a warning (`insightVariant="warning"`) is amber.
 *
 * Shows only what the data has: badges and chart tabs appear for metrics
 * some session measured, so early on (before assessments) the page is the
 * header and the evidence strip — e.g. talk time and a first line per session.
 */
function StudentProgressView({
  student,
  sessionLabels: sessionLabelsProp,
  standardLabel = "Standard",
  insight,
  insightVariant = "info",
  className,
}: {
  student: StudentProgressData
  /** Every session's chart label, in order; defaults to the sessions' own labels */
  sessionLabels?: string[]
  /** Name of the standard being measured, e.g. "CCSS"; defaults to "Standard" */
  standardLabel?: string
  insight?: string
  insightVariant?: "info" | "warning"
  className?: string
}) {
  const native = Boolean(student.isNativeEnglish)
  const present = student.sessions.filter((s) => !s.absent)
  const measured = (metric: ProgressMetric) =>
    present.some((s) => metricValue(s, metric) !== null)
  const metrics = (
    [
      { value: "wida", label: "WIDA score" },
      { value: "standard", label: `${standardLabel} goal` },
      { value: "participation", label: "Participation" },
      { value: "academic", label: "Academic language" },
    ] as const
  ).filter((m) => !(m.value === "wida" && native) && measured(m.value))
  const [selected, setMetric] = React.useState<ProgressMetric>()
  const metric =
    metrics.find((m) => m.value === selected)?.value ?? metrics[0]?.value
  // Dates are shorter than session names, so they fit the chart's axis
  const sessionLabels =
    sessionLabelsProp ??
    student.sessions.map((s) => s.dateLabel ?? s.sessionLabel)

  const latest = present[present.length - 1]
  const wida = latest?.widaScore
  const sessionCount =
    present.length === student.sessions.length
      ? `${present.length} ${present.length === 1 ? "session" : "sessions"} recorded`
      : `In ${present.length} of ${student.sessions.length} sessions`

  return (
    <div
      data-slot="student-progress-view"
      className={cn("flex flex-col gap-5 overflow-y-auto p-6", className)}
    >
      <div className="flex items-start gap-3">
        <Avatar size="lg">
          <AvatarFallback>{initials(student.name)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-h3">{student.name}</h2>
            {student.primaryLanguage && (
              <span className="text-sm text-muted-foreground">
                {student.primaryLanguage}
              </span>
            )}
            {typeof wida === "number" ? (
              <Badge variant="outline">
                WIDA {wida.toFixed(1)} · {widaLabel(wida)}
              </Badge>
            ) : (
              (wida === null || native) && (
                <Badge variant="outline">Native English</Badge>
              )
            )}
            {latest?.standardVerdict && (
              <VerdictBadge
                label={standardLabel}
                verdict={latest.standardVerdict}
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{sessionCount}</p>
        </div>
      </div>

      {insight && (
        <InsightCallout variant={insightVariant}>{insight}</InsightCallout>
      )}

      {student.sessions.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarIcon />
            </EmptyMedia>
            <EmptyTitle>No sessions yet</EmptyTitle>
            <EmptyDescription>
              {student.name}&apos;s progress shows here once they&apos;re in a
              session&apos;s group or assigned to a speaker.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {metric && (
            <>
              <Separator />

              <div className="flex flex-col gap-2">
                <SectionLabel>
                  {metrics.length > 1
                    ? "Progress over time"
                    : `${metrics[0].label} over time`}
                </SectionLabel>
                <Tabs
                  value={metric}
                  onValueChange={(next) => setMetric(next as ProgressMetric)}
                >
                  {metrics.length > 1 && (
                    <TabsList className="w-full">
                      {metrics.map((m) => (
                        <TabsTrigger key={m.value} value={m.value}>
                          {m.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  )}
                  {metrics.map((m) => (
                    <TabsContent key={m.value} value={m.value}>
                      <ProgressChart
                        sessions={student.sessions}
                        sessionLabels={sessionLabels}
                        metric={m.value}
                        standardLabel={standardLabel}
                        isNativeEnglish={native}
                        studentName={student.name}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col gap-3">
            <SectionLabel>Session evidence</SectionLabel>
            <SessionEvidenceStrip
              sessions={student.sessions}
              standardLabel={standardLabel}
            />
          </div>
        </>
      )}
    </div>
  )
}

export { StudentProgressView }
