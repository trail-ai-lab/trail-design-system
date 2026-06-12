import { CheckIcon, MicIcon, PauseIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Per-group audio state:
 * - `recording` — audio is actively being captured (red)
 * - `paused` — capture is paused (amber)
 * - `uploaded` — the recording finished and uploaded successfully (blue)
 */
export type SessionStatus = "recording" | "paused" | "uploaded"

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
}

/** Dot color (with pulse for recording) for a status, reused by the group tabs. */
export function statusDotClassName(status: SessionStatus) {
  return statusConfig[status].dotClassName
}

function SessionStatusBadge({
  status,
  showIcon = false,
  className,
}: {
  status: SessionStatus
  showIcon?: boolean
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
    </Badge>
  )
}

export { SessionStatusBadge }
