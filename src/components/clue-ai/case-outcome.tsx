import * as React from "react"
import {
  GavelIcon,
  MedalIcon,
  SearchXIcon,
  TrophyIcon,
  UserRoundSearchIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DetailList } from "@/components/patterns/detail-list"
import { StatusBadge } from "@/components/patterns/status-badge"
import { VERDICTS, type Suspect, type Verdict } from "./lib/case"

/** How the final call went: right person and motive, right person only, or wrong person. */
export type CaseOutcomeResult = "solved" | "partial" | "unsolved"

const RESULT: Record<
  CaseOutcomeResult,
  {
    kicker: string
    stamp: string
    tone: "success" | "warning" | "destructive"
    icon: LucideIcon
    stampClassName: string
  }
> = {
  solved: {
    kicker: "Case closed",
    stamp: "Charged",
    tone: "success",
    icon: TrophyIcon,
    stampClassName: "text-success",
  },
  partial: {
    kicker: "Case not proven",
    stamp: "Released",
    tone: "warning",
    icon: SearchXIcon,
    stampClassName: "text-warning",
  },
  unsolved: {
    kicker: "The case went cold",
    stamp: "Convicted",
    tone: "destructive",
    icon: GavelIcon,
    stampClassName: "text-destructive",
  },
}

export interface CaseOutcomeSuspect {
  suspect: Suspect
  verdict?: Verdict
  /** Sentences the team classified correctly */
  score?: number
  sentenceCount: number
}

export interface CaseOutcomeEvent {
  time: string
  label: string
}

/** A second person in the story: who walks free, or the killer still at large. */
export interface CaseOutcomeAside {
  /** Omit for someone unknown — e.g. the real killer after a wrong call */
  suspect?: Suspect
  title: React.ReactNode
  description?: React.ReactNode
}

/**
 * The end screen, as the case's closing front page — the bookend to the
 * opening `BreakingNewsCard`. The person the call sent to court fills the
 * photo with a rubber stamp ("Charged", "Released", "Convicted"); the
 * headline and deck tell the story; an aside shows who walked free (or that
 * the real killer is still out there); a stat row scores the run, with an
 * optional detective rank; then `actions`.
 *
 * Below the front page: `children` (Sherlock's closing words), the final call,
 * how the team did on each suspect, and the investigation timeline.
 */
function CaseOutcome({
  result,
  masthead,
  dateline,
  headline,
  description,
  featured,
  stamp,
  aside,
  stats,
  rank,
  accusation,
  suspects,
  timeline,
  actions,
  children,
  className,
}: {
  result: CaseOutcomeResult
  /** Paper name, e.g. "The London Ledger" */
  masthead?: string
  /** e.g. "Harpe Estate, Surrey · Late edition" */
  dateline?: string
  headline: React.ReactNode
  /** The deck under the headline */
  description: React.ReactNode
  /** The person on the front page: who you accused, or who took the fall */
  featured?: Suspect
  /** Stamp over the photo; defaults by result */
  stamp?: string
  aside?: CaseOutcomeAside
  /** The run's score, e.g. sentences right, verdicts used, time */
  stats?: { label: string; value: React.ReactNode }[]
  /** A detective rank for the run, e.g. "Chief Inspector" */
  rank?: string
  /** The final call and its facts */
  accusation: { label: string; value: React.ReactNode }[]
  suspects: CaseOutcomeSuspect[]
  timeline?: CaseOutcomeEvent[]
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  const meta = RESULT[result]
  const Icon = meta.icon
  const isGrim = result !== "solved"

  return (
    <div
      data-slot="case-outcome"
      data-result={result}
      className={cn("flex flex-col gap-(--shell-gap)", className)}
    >
      <Card className="gap-0 py-0">
        <div className={cn("grid", featured && "md:grid-cols-5")}>
          {featured && (
            <figure className="relative md:col-span-2">
              {featured.portraitUrl ? (
                <img
                  src={featured.portraitUrl}
                  alt={featured.name}
                  className={cn(
                    "aspect-4/3 w-full bg-muted object-cover md:aspect-auto md:h-full",
                    result === "unsolved" && "grayscale"
                  )}
                />
              ) : (
                <div className="flex aspect-4/3 w-full items-center justify-center bg-muted font-heading text-display text-muted-foreground md:aspect-auto md:h-full">
                  {featured.initials}
                </div>
              )}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-foreground/50 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-5">
                <span
                  data-slot="case-outcome-stamp"
                  className={cn(
                    "-rotate-6 rounded-xl border-4 border-current bg-card px-4 py-1 font-heading text-h3 font-extrabold tracking-widest uppercase shadow-raised motion-safe:animate-in motion-safe:duration-300 motion-safe:zoom-in-125",
                    meta.stampClassName
                  )}
                >
                  {stamp ?? meta.stamp}
                </span>
                <span className="text-caption font-medium text-background">
                  {featured.name}
                </span>
              </figcaption>
            </figure>
          )}

          <div className="flex flex-col gap-5 p-(--card-spacing) md:col-span-3 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusBadge tone={meta.tone} icon={Icon}>
                {meta.kicker}
              </StatusBadge>
              {dateline && (
                <span className="text-caption text-muted-foreground">
                  {dateline}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {masthead && (
                <p className="font-heading text-label tracking-widest text-muted-foreground uppercase">
                  {masthead}
                </p>
              )}
              <h1 className="text-h2 text-balance">{headline}</h1>
              <p className="text-body text-pretty text-muted-foreground">
                {description}
              </p>
            </div>

            {aside && (
              <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
                <Avatar size="lg">
                  {aside.suspect?.portraitUrl && (
                    <AvatarImage src={aside.suspect.portraitUrl} alt="" />
                  )}
                  <AvatarFallback>
                    {aside.suspect ? (
                      aside.suspect.initials
                    ) : (
                      <UserRoundSearchIcon aria-hidden className="size-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <span className="text-body-sm font-medium">
                    {aside.title}
                  </span>
                  {aside.description && (
                    <span className="text-caption text-muted-foreground">
                      {aside.description}
                    </span>
                  )}
                </div>
              </div>
            )}

            {rank && (
              <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
                <MedalIcon
                  aria-hidden
                  className={cn(
                    "size-6 shrink-0",
                    isGrim ? "text-muted-foreground" : "text-success"
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-caption text-muted-foreground">
                    Your rank
                  </span>
                  <span className="font-heading text-title">{rank}</span>
                </div>
              </div>
            )}
            {stats && stats.length > 0 && (
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats?.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-1 rounded-2xl bg-muted/50 p-3"
                  >
                    <dt className="text-caption text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="text-h3 tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
        </div>
      </Card>

      {children}

      <div className="grid gap-(--shell-gap) md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your final call</CardTitle>
            <CardDescription>What the team submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <DetailList items={accusation} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspects</CardTitle>
            <CardDescription>
              {suspects.filter((s) => s.verdict).length} of {suspects.length}{" "}
              investigated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {suspects.map(({ suspect, verdict, score, sentenceCount }) => (
                <li key={suspect.id} className="flex items-center gap-3">
                  <Avatar>
                    {suspect.portraitUrl && (
                      <AvatarImage src={suspect.portraitUrl} alt="" />
                    )}
                    <AvatarFallback>{suspect.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-body-sm font-medium">
                      {suspect.name}
                    </span>
                    <span className="text-caption text-muted-foreground tabular-nums">
                      {score !== undefined
                        ? `${score}/${sentenceCount} sentences correct`
                        : "Not investigated"}
                    </span>
                  </div>
                  {verdict ? (
                    <StatusBadge tone={VERDICTS[verdict].tone}>
                      {VERDICTS[verdict].label}
                    </StatusBadge>
                  ) : (
                    <StatusBadge tone="muted">Skipped</StatusBadge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {timeline && timeline.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Investigation timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative flex flex-col gap-4 before:absolute before:inset-y-1.5 before:left-1 before:w-px before:bg-border">
              {timeline.map((event, i) => (
                <li key={i} className="relative flex gap-4 pl-6">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 left-0 size-2.5 rounded-full border-2 border-card bg-muted-foreground",
                      i === timeline.length - 1 && "bg-foreground"
                    )}
                  />
                  <span className="w-16 shrink-0 text-caption text-muted-foreground tabular-nums">
                    {event.time}
                  </span>
                  <span className="text-body-sm">{event.label}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { CaseOutcome }
