import { CheckIcon, MicIcon, PauseIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Per-group audio state:
 * - `recording` — audio is actively being captured
 * - `paused` — capture is paused
 * - `uploaded` — the recording finished and uploaded successfully
 */
export type SessionStatus = "recording" | "paused" | "uploaded"

const statusConfig: Record<
  SessionStatus,
  { label: string; icon: typeof MicIcon; className: string; dotClassName: string }
> = {
  recording: {
    label: "Recording",
    icon: MicIcon,
    className: "bg-primary/10 text-primary",
    dotClassName: "bg-primary animate-pulse",
  },
  paused: {
    label: "Paused",
    icon: PauseIcon,
    className: "bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground",
  },
  uploaded: {
    label: "Uploaded",
    icon: CheckIcon,
    className: "bg-secondary text-secondary-foreground",
    dotClassName: "bg-primary",
  },
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
