"use client"

import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { formatElapsed } from "@/components/slai/lib/format"
import { SpeakerAssignDropdown } from "@/components/slai/speaker-assign-dropdown"

export interface ContributionSpeaker {
  id: string
  /** Diarized label, e.g. "Speaker 1" */
  label: string
  /** Total speaking time in seconds */
  seconds: number
  /** Assigned student name, if any */
  student?: string
}

/** Distinct, token-based fills for the stacked bar and row dots. */
export const SPEAKER_FILLS = [
  "bg-primary",
  "bg-foreground",
  "bg-primary/60",
  "bg-foreground/55",
  "bg-primary/30",
  "bg-foreground/25",
] as const

/**
 * Speaking-time breakdown for a diarized recording: a stacked bar of each
 * speaker's share and a row per speaker where the teacher assigns a student.
 */
function ContributionPanel({
  speakers,
  students,
  onAssign,
  onAddStudent,
  status = "idle",
  className,
}: {
  speakers: ContributionSpeaker[]
  /** Student roster offered in each assignment dropdown */
  students: string[]
  onAssign?: (speakerId: string, student: string | undefined) => void
  onAddStudent?: (name: string) => void
  /** Persistence state of the latest assignment */
  status?: "idle" | "saving" | "saved"
  className?: string
}) {
  const total = speakers.reduce((sum, speaker) => sum + speaker.seconds, 0)
  const percent = (seconds: number) =>
    total > 0 ? Math.round((seconds / total) * 100) : 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Speaking time
          <Badge variant="secondary">{speakers.length} speakers</Badge>
        </CardTitle>
        <CardAction className="text-xs text-muted-foreground">
          {status === "saving" && (
            <span className="flex items-center gap-1.5">
              <Spinner className="size-3" /> Saving...
            </span>
          )}
          {status === "saved" && (
            <span className="flex items-center gap-1.5">
              <CheckIcon className="size-3" /> Saved
            </span>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div
          role="img"
          aria-label="Speaking time share by speaker"
          className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
        >
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className={cn("h-full", SPEAKER_FILLS[index % SPEAKER_FILLS.length])}
              style={{ width: `${percent(speaker.seconds)}%` }}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-3">
          {speakers.map((speaker, index) => (
            <li key={speaker.id} className="flex items-center gap-3">
              <span
                aria-hidden
                className={cn(
                  "size-2.5 shrink-0 rounded-full",
                  SPEAKER_FILLS[index % SPEAKER_FILLS.length]
                )}
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  {speaker.student ?? speaker.label}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {percent(speaker.seconds)}% · {formatElapsed(speaker.seconds)}
                </span>
              </div>
              <SpeakerAssignDropdown
                students={students}
                value={speaker.student}
                onValueChange={(student) => onAssign?.(speaker.id, student)}
                onAddStudent={onAddStudent}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { ContributionPanel }
