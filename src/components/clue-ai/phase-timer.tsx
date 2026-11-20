import { HourglassIcon, LockIcon, TimerIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatElapsed } from "@/lib/format"

export type PhaseTimerStatus = "idle" | "running" | "expired"

/**
 * The shared countdown for a timed phase — solo analysis or deliberation —
 * as a toolbar pill: phase name, time left and a hairline showing how much is
 * gone. Turns to `warning` in the last minute; once expired it says the phase
 * is locked. Both players see the same clock (it starts from a shared time).
 */
function PhaseTimer({
  label,
  remainingSeconds,
  totalSeconds,
  status = "running",
  className,
}: {
  /** Phase name, e.g. "Solo analysis" or "Deliberation" */
  label: string
  remainingSeconds: number
  totalSeconds: number
  status?: PhaseTimerStatus
  className?: string
}) {
  const isLow = status === "running" && remainingSeconds <= 60
  const elapsed =
    status === "idle"
      ? 0
      : status === "expired"
        ? 100
        : ((totalSeconds - remainingSeconds) / totalSeconds) * 100
  const Icon =
    status === "expired"
      ? LockIcon
      : status === "idle"
        ? TimerIcon
        : HourglassIcon

  return (
    <div
      data-slot="phase-timer"
      data-status={status}
      data-low={isLow || undefined}
      className={cn(
        "relative inline-flex h-8 items-center gap-2 overflow-hidden rounded-full border border-border bg-card pr-3 pl-2.5 text-body-sm data-low:border-warning/40 data-low:bg-warning/10 data-[status=expired]:bg-muted",
        className
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "size-4 text-muted-foreground",
          isLow && "text-warning",
          status === "running" && !isLow && "text-foreground"
        )}
      />
      <span className="text-muted-foreground">{label}</span>
      <span
        role="timer"
        aria-label={`${label}: ${status === "expired" ? "time's up" : `${formatElapsed(remainingSeconds)} left`}`}
        className={cn(
          "font-medium tabular-nums",
          isLow && "text-warning",
          status === "expired" && "text-muted-foreground"
        )}
      >
        {status === "expired"
          ? "Time's up"
          : formatElapsed(status === "idle" ? totalSeconds : remainingSeconds)}
      </span>
      {status !== "idle" && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 bg-border"
        >
          <span
            className={cn(
              "block h-full origin-left bg-foreground transition-transform duration-slow ease-standard",
              isLow && "bg-warning",
              status === "expired" && "bg-muted-foreground"
            )}
            style={{ transform: `scaleX(${elapsed / 100})` }}
          />
        </span>
      )}
    </div>
  )
}

export { PhaseTimer }
