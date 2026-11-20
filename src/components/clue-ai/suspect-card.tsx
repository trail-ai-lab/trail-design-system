import * as React from "react"
import { LockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  StatusBadge,
  type StatusTone,
} from "@/components/patterns/status-badge"
import { VERDICTS, type Suspect, type Verdict } from "./lib/case"

/** Where a suspect stands on the board. */
export type SuspectStatus =
  "required" | "available" | "in-progress" | "completed" | "locked"

const STATUS: Record<
  SuspectStatus,
  { label: string; tone: StatusTone; action: string }
> = {
  required: {
    label: "Start here",
    tone: "primary",
    action: "Start investigation",
  },
  available: { label: "Open lead", tone: "neutral", action: "Investigate" },
  "in-progress": { label: "In progress", tone: "info", action: "Continue" },
  completed: { label: "Investigated", tone: "success", action: "Review case" },
  locked: { label: "Locked", tone: "muted", action: "Locked" },
}

/**
 * One suspect on the board: portrait, name and relation to the victim, where
 * they stand, and the team's verdict once there is one. The footer button
 * opens (or reviews) their investigation; a locked suspect says why.
 */
function SuspectCard({
  suspect,
  status,
  sentenceCount,
  score,
  verdict,
  lockedReason = "Finish the first lead",
  onSelect,
  className,
}: {
  suspect: Suspect
  status: SuspectStatus
  /** Sentences in their AI summary */
  sentenceCount: number
  /** Sentences the team classified correctly, once investigated */
  score?: number
  /** The team's call, once made */
  verdict?: { verdict: Verdict; motive?: string }
  /** Footer text for a locked suspect */
  lockedReason?: string
  onSelect?: () => void
  className?: string
}) {
  const meta = STATUS[status]
  const isLocked = status === "locked"

  return (
    <Card
      data-slot="suspect-card"
      data-status={status}
      className={cn(
        "group/suspect transition-shadow duration-base ease-standard has-[button:enabled:hover]:shadow-overlay",
        className
      )}
    >
      <div
        className={cn(
          "relative",
          suspect.portraitUrl && "-mt-(--card-spacing)"
        )}
      >
        {suspect.portraitUrl ? (
          <img
            src={suspect.portraitUrl}
            alt=""
            className={cn(
              "aspect-4/3 w-full bg-muted object-cover object-top",
              isLocked && "opacity-50 grayscale"
            )}
          />
        ) : (
          <div
            aria-hidden
            className="mx-(--card-spacing) flex aspect-4/3 items-center justify-center rounded-2xl bg-muted font-heading text-h1 text-muted-foreground"
          >
            {suspect.initials}
          </div>
        )}
        <StatusBadge
          tone={meta.tone}
          icon={isLocked ? LockIcon : undefined}
          className={cn(
            "absolute top-3 bg-card shadow-raised",
            suspect.portraitUrl ? "left-3" : "left-(--card-spacing) ml-3"
          )}
        >
          {meta.label}
        </StatusBadge>
      </div>
      <CardHeader>
        <CardTitle className="min-w-0 truncate" title={suspect.name}>
          {suspect.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10">
          {suspect.role}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end gap-2 text-body-sm">
        {verdict ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-muted-foreground">Team verdict</span>
            <StatusBadge tone={VERDICTS[verdict.verdict].tone}>
              {VERDICTS[verdict.verdict].label}
            </StatusBadge>
            {verdict.motive && (
              <span className="text-muted-foreground">· {verdict.motive}</span>
            )}
          </div>
        ) : null}
        <p className="text-muted-foreground tabular-nums">
          {score !== undefined ? (
            <>
              <span className="font-medium text-foreground">{score}</span>/
              {sentenceCount} sentences correct
            </>
          ) : (
            `${sentenceCount} sentences to check`
          )}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={
            status === "required" || status === "in-progress"
              ? "default"
              : "outline"
          }
          disabled={isLocked}
          onClick={onSelect}
          aria-label={isLocked ? undefined : `${meta.action}: ${suspect.name}`}
        >
          {isLocked && <LockIcon data-icon="inline-start" />}
          {isLocked ? lockedReason : meta.action}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { SuspectCard }
