import { CheckIcon, MicIcon, MicOffIcon, PauseIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatElapsed } from "@/components/slai/lib/format"

/**
 * Per-group audio state:
 * - `recording` — audio is actively being captured (red)
 * - `paused` — capture is paused (amber)
 * - `uploaded` — the recording finished and uploaded successfully (blue)
 * - `stopped` — capture ended and the group is no longer recording (blue)
 * - `idle` — the group joined but has not started recording (muted)
 */
export type SessionStatus =
  | "recording"
  | "paused"
  | "uploaded"
  | "stopped"
  | "idle"

const statusConfig: Record<
  SessionStatus,
  { label: string; icon: typeof MicIcon; className: string; dotClassName: string }
> = {
  recording: {
    label: "Recording",
    icon: MicIcon,
    className: "bg-status-recording/10 text-status-recording",
    dotClassName: "bg-status-recording animate-pulse",
  },
  paused: {
    label: "Paused",
    icon: PauseIcon,
    className: "bg-status-paused/10 text-status-paused",
    dotClassName: "bg-status-paused",
  },
  uploaded: {
    label: "Uploaded",
    icon: CheckIcon,
    className: "bg-status-uploaded/10 text-status-uploaded",
    dotClassName: "bg-status-uploaded",
  },
  stopped: {
    label: "Stopped",
    icon: MicOffIcon,
    className: "bg-status-uploaded/10 text-status-uploaded",
    dotClassName: "bg-status-uploaded",
  },
  idle: {
    label: "Idle",
    icon: MicOffIcon,
    className: "bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground/40",
  },
}

/** Dot color (with pulse for recording) for a status, reused by the group tabs. */
export function statusDotClassName(status: SessionStatus) {
  return statusConfig[status].dotClassName
}

function SessionStatusBadge({
  status,
  showIcon = false,
  elapsedSeconds,
  className,
}: {
  status: SessionStatus
  showIcon?: boolean
  /** Elapsed capture time, appended as mm:ss while recording or paused */
  elapsedSeconds?: number
  className?: string
}) {
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <Badge variant="secondary" className={cn(config.className, className)}>
      {showIcon ? (
        <Icon data-icon="inline-start" />
      ) : (
        <span className={cn("size-1.5 rounded-full", config.dotClassName)} />
      )}
      {config.label}
      {elapsedSeconds !== undefined &&
        (status === "recording" || status === "paused") && (
          <span className="tabular-nums">{formatElapsed(elapsedSeconds)}</span>
        )}
    </Badge>
  )
}

export { SessionStatusBadge }
