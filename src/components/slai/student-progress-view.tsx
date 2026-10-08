"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/patterns/section-label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightCallout } from "@/components/slai/insight-callout"
import { initials } from "@/lib/format"
import { ProgressChart } from "@/components/slai/progress-chart"
import { SessionEvidenceStrip } from "@/components/slai/session-evidence-strip"
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
 */
function StudentProgressView({
  student,
  sessionLabels,
  standardLabel,
  insight,
  insightVariant = "info",
  className,
}: {
  student: StudentProgressData
  /** Every session's chart label, in order */
  sessionLabels: string[]
  /** Name of the standard being measured, e.g. "CCSS" */
  standardLabel: string
  insight?: string
  insightVariant?: "info" | "warning"
  className?: string
}) {
  const native = Boolean(student.isNativeEnglish)
  const metrics: Array<{ value: ProgressMetric; label: string }> = [
    ...(native ? [] : [{ value: "wida" as const, label: "WIDA score" }]),
    { value: "standard", label: `${standardLabel} goal` },
    { value: "participation", label: "Participation" },
    { value: "academic", label: "Academic language" },
  ]
  const [metric, setMetric] = React.useState<ProgressMetric>(
    native ? "standard" : "wida"
  )

  const latest = student.sessions[student.sessions.length - 1]
  const wida = latest.widaScore

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
            <span className="text-sm text-muted-foreground">
              {student.primaryLanguage}
            </span>
            {wida !== null ? (
              <Badge variant="outline">
                WIDA {wida.toFixed(1)} · {widaLabel(wida)}
              </Badge>
            ) : (
              <Badge variant="outline">Native English</Badge>
            )}
            <VerdictBadge
              label={standardLabel}
              verdict={latest.standardVerdict}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {student.sessions.length} sessions recorded
          </p>
        </div>
      </div>

      {insight && (
        <InsightCallout variant={insightVariant}>{insight}</InsightCallout>
      )}

      <Separator />

      <div className="flex flex-col gap-2">
        <SectionLabel>Progress over time</SectionLabel>
        <Tabs
          value={metric}
          onValueChange={(next) => setMetric(next as ProgressMetric)}
        >
          <TabsList className="w-full">
            {metrics.map((m) => (
              <TabsTrigger key={m.value} value={m.value}>
                {m.label}
              </TabsTrigger>
            ))}
          </TabsList>
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

      <Separator />

      <div className="flex flex-col gap-3">
        <SectionLabel>Session evidence</SectionLabel>
        <SessionEvidenceStrip
          sessions={student.sessions}
          standardLabel={standardLabel}
        />
      </div>
    </div>
  )
}

export { StudentProgressView }
