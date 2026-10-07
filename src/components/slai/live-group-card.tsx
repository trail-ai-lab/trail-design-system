"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageChip } from "@/components/slai/language-chip"
import { RecordingTimer } from "@/components/slai/recording-timer"
import {
  SessionStatusBadge,
  type SessionStatus,
} from "@/components/slai/session-status-badge"

const EMPTY_COPY: Partial<Record<SessionStatus, string>> = {
  idle: "No recording yet.",
  stopped: "Recording complete.",
}

/**
 * Live monitor for one group during a session: name, status with a running
 * timer, students, languages, and a scrolling feed of the newest transcript
 * chunks. Shown in a grid on the teacher's active-session view.
 */
function LiveGroupCard({
  name,
  status,
  students,
  languages,
  elapsedSeconds,
  chunks,
  className,
}: {
  name: string
  status: SessionStatus
  students: string[]
  languages?: string[]
  /** Seconds since recording started; shown only while recording */
  elapsedSeconds?: number
  /** Latest transcript lines, oldest first */
  chunks: string[]
  className?: string
}) {
  return (
    <Card className={cn("min-w-0", className)}>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {name}
          <SessionStatusBadge status={status} />
          {status === "recording" && elapsedSeconds !== undefined && (
            <RecordingTimer
              seconds={elapsedSeconds}
              compact
              className="text-xs text-muted-foreground"
            />
          )}
        </CardTitle>
        <p className="col-start-1 truncate text-xs text-muted-foreground">
          {students.length > 0 ? students.join(", ") : "No student names provided"}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {languages && languages.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {languages.map((language) => (
              <LanguageChip key={language} variant="spoken" languages={[language]} />
            ))}
          </div>
        )}
        <ScrollArea className="h-28 rounded-xl bg-muted/50">
          {chunks.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground italic">
              {EMPTY_COPY[status] ?? "Waiting for speech..."}
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5 p-3 text-sm">
              {chunks.map((chunk, i) => (
                <li key={i}>{chunk}</li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { LiveGroupCard }
