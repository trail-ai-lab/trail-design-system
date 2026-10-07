"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  VERDICT_VALUE,
} from "@/components/slai/lib/verdict"
import type {
  ProgressMetric,
  StudentSessionData,
} from "@/components/slai/lib/student-progress"

function metricValue(session: StudentSessionData, metric: ProgressMetric) {
  switch (metric) {
    case "wida":
      return session.widaScore
    case "standard":
      return VERDICT_VALUE[session.standardVerdict]
    case "participation":
      return session.participationPct
    case "academic":
      return session.academicTermCount
  }
}

function metricLabel(metric: ProgressMetric, standardLabel: string) {
  return {
    wida: "WIDA score",
    standard: `${standardLabel} goal`,
    participation: "Participation %",
    academic: "Academic terms",
  }[metric]
}

const verdictTick = (v: number) =>
  v === 0 ? "Not yet" : v === 0.5 ? "Partial" : v === 1 ? "Met" : ""

type Point = { label: string; value: number | null; isLatest: boolean }

function Dot(props: { cx?: number; cy?: number; payload?: Point }) {
  const { cx = 0, cy = 0, payload } = props
  if (payload?.value == null) return null
  return (
    <g>
      {payload.isLatest && (
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          fontSize={9}
          fontWeight={600}
          letterSpacing={0.5}
          fill="var(--muted-foreground)"
        >
          LATEST
        </text>
      )}
      <circle
        cx={cx}
        cy={cy}
        r={payload.isLatest ? 7 : 4}
        fill="var(--color-value)"
        stroke="var(--background)"
        strokeWidth={payload.isLatest ? 2.5 : 1.5}
      />
    </g>
  )
}

function trendLabel(data: Point[], threshold: number) {
  return function TrendLabel(props: {
    x?: number | string
    y?: number | string
    value?: number | string
    index?: number
  }) {
    const { x, y, value, index } = props
    if (!index) return null
    const prev = data[index - 1]?.value
    if (prev == null || value == null) return null
    const diff = Number(value) - prev
    if (Math.abs(diff) < threshold) return null
    const up = diff > 0
    return (
      <text
        x={Number(x)}
        y={Number(y) - (up ? 22 : 6)}
        textAnchor="middle"
        fontSize={13}
        fontWeight="bold"
        fill={up ? "var(--status-uploaded)" : "var(--status-recording)"}
      >
        {up ? "↑" : "↓"}
      </text>
    )
  }
}

/**
 * Progress of one student across all sessions for a chosen metric. WIDA,
 * standards and participation are lines (the standards line steps between
 * verdicts); academic language is a bar chart. Sessions the student missed
 * are gaps joined by a faint dashed line, the latest session is emphasized,
 * and large session-to-session changes get an up or down arrow.
 */
function ProgressChart({
  sessions,
  sessionLabels,
  metric,
  standardLabel,
  isNativeEnglish = false,
  studentName,
  className,
}: {
  sessions: StudentSessionData[]
  /** Every session's x-axis label, in order; absent sessions show as gaps */
  sessionLabels: string[]
  metric: ProgressMetric
  standardLabel: string
  /** Native English speakers have no WIDA series */
  isNativeEnglish?: boolean
  studentName?: string
  className?: string
}) {
  const data = React.useMemo<Point[]>(() => {
    const last = sessions[sessions.length - 1]
    return sessionLabels.map((label, i) => {
      const session = sessions.find((s) => s.sessionIndex === i + 1)
      return {
        label,
        value: session ? metricValue(session, metric) : null,
        isLatest: session !== undefined && session === last,
      }
    })
  }, [sessions, sessionLabels, metric])

  const config = {
    value: {
      label: metricLabel(metric, standardLabel),
      color: "var(--primary)",
    },
  }

  if (metric === "wida" && isNativeEnglish) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <p className="text-sm text-muted-foreground italic">
          {studentName ?? "This student"} is a native English speaker — no WIDA
          score recorded.
        </p>
      </div>
    )
  }

  const axis = {
    tick: { fontSize: 11 },
    tickLine: false,
    axisLine: false,
  } as const

  if (metric === "academic") {
    return (
      <ChartContainer config={config} className={className ?? "aspect-auto h-60 w-full"}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" {...axis} />
          <YAxis allowDecimals={false} width={28} {...axis} />
          <Tooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map((point, i) => (
              <Cell
                key={i}
                fill="var(--color-value)"
                fillOpacity={point.isLatest ? 1 : 0.6}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              style={{ fontSize: 11, fontWeight: 600, fill: "var(--color-value)" }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    )
  }

  const standard = metric === "standard"
  const domain: [number, number] =
    metric === "wida" ? [1.5, 5] : standard ? [-0.1, 1.2] : [0, 100]
  const ticks =
    metric === "wida"
      ? [2, 3, 4, 5]
      : standard
        ? [0, 0.5, 1]
        : [0, 25, 50, 75, 100]
  const trendThreshold = metric === "wida" ? 0.05 : standard ? 0.2 : 5
  const lineType = standard ? "stepAfter" : "monotone"

  return (
    <ChartContainer config={config} className={className ?? "aspect-auto h-60 w-full"}>
      <LineChart data={data} margin={{ top: 36, right: 24, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis
          domain={domain}
          ticks={ticks}
          tickFormatter={standard ? verdictTick : undefined}
          width={standard ? 54 : 36}
          {...axis}
        />
        <Tooltip
          content={
            <ChartTooltipContent
              formatter={
                standard
                  ? (v) => [verdictTick(Number(v)), `${standardLabel} goal`]
                  : undefined
              }
            />
          }
        />
        {/* Faint dashed connector, drawn across absent sessions */}
        <Line
          type={lineType}
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          strokeOpacity={0.35}
          connectNulls
          dot={false}
          activeDot={false}
        />
        <Line
          type={lineType}
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={(props) => {
            const { key, ...rest } = props as typeof props & { key?: string }
            return <Dot key={key} {...rest} />
          }}
          activeDot={{
            r: 8,
            stroke: "var(--background)",
            strokeWidth: 2,
            fill: "var(--color-value)",
          }}
        >
          <LabelList
            dataKey="value"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content={trendLabel(data, trendThreshold) as any}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  )
}

export { ProgressChart }
