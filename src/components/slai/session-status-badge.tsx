import { CheckIcon, MicIcon, MicOffIcon, PauseIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  StatusBadge,
  statusToneDotClassName,
  type StatusTone,
} from "@/components/patterns/status-badge"
import { formatElapsed } from "@/lib/format"

/**
 * Per-group audio state:
 * - `recording` — audio is actively being captured (red)
 * - `paused` — capture is paused (amber)
 * - `uploaded` — the recording finished and uploaded successfully (blue)
 * - `stopped` — capture ended and the group is no longer recording (blue)
 * - `idle` — the group joined but has not started recording (muted)
 */
export type SessionStatus =
  "recording" | "paused" | "uploaded" | "stopped" | "idle"

const statusConfig: Record<
  SessionStatus,
  { label: string; icon: typeof MicIcon; tone: StatusTone }
> = {
  recording: { label: "Recording", icon: MicIcon, tone: "recording" },
  paused: { label: "Paused", icon: PauseIcon, tone: "paused" },
  uploaded: { label: "Uploaded", icon: CheckIcon, tone: "uploaded" },
  stopped: { label: "Stopped", icon: MicOffIcon, tone: "neutral" },
  idle: { label: "Idle", icon: MicOffIcon, tone: "muted" },
}

/** Display label for a status, e.g. "Paused"; pairs with `statusDotClassName`. */
export function statusLabel(status: SessionStatus) {
  return statusConfig[status].label
}

/** Dot color (with pulse for recording) for a status, reused by the group switcher. */
export function statusDotClassName(status: SessionStatus) {
  return cn(
    statusToneDotClassName(statusConfig[status].tone),
    status === "recording" && "motion-safe:animate-pulse"
  )
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
  return (
    <StatusBadge
      tone={config.tone}
      icon={showIcon ? config.icon : undefined}
      dot={!showIcon}
      pulse={status === "recording"}
      data-slot="session-status-badge"
      className={className}
    >
      {config.label}
      {elapsedSeconds !== undefined &&
        (status === "recording" || status === "paused") && (
          <span className="tabular-nums">{formatElapsed(elapsedSeconds)}</span>
        )}
    </StatusBadge>
  )
}

export { SessionStatusBadge }
