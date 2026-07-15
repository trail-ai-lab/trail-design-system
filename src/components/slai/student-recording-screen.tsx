"use client"

import { ClockIcon, LogOutIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { RecordingControl } from "@/components/slai/recording-control"
import { StudentChip } from "@/components/slai/student-chip"

/**
 * The screen a student sees on their own device while recording: session
 * context and roster up top, the shared tap-to-record control front and
 * center. No teacher shell/sidebar here — this runs standalone on a phone.
 */
function StudentRecordingScreen({
  groupName,
  sessionName,
  joinedAt,
  students = [],
  onLeave,
  className,
}: {
  groupName: string
  /** e.g. "Physics · Period 3 — Aug 21" */
  sessionName?: string
  /** Pre-formatted time the student joined, e.g. "10:32 AM" */
  joinedAt?: string
  students?: string[]
  onLeave?: () => void
  className?: string
}) {
  return (
    <div className={cn("flex min-h-svh flex-col px-6 py-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>{groupName}</CardTitle>
          {(sessionName || joinedAt) && (
            <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {sessionName && <span>{sessionName}</span>}
              {joinedAt && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  Joined at {joinedAt}
                </span>
              )}
            </CardDescription>
          )}
          {students.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {students.map((name, index) => (
                <StudentChip key={`${name}-${index}`} name={name} />
              ))}
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onLeave}>
          <LogOutIcon data-icon="inline-start" />
          Leave
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <RecordingControl
          captions={{
            idle: "Tap to start recording",
            recording: "Tap to pause recording",
            paused: "Paused — tap to resume",
          }}
        />
      </div>
    </div>
  )
}

export { StudentRecordingScreen }
