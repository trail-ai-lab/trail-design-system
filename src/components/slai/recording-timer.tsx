import { cn } from "@/lib/utils"
import { formatDuration, formatElapsed } from "@/lib/format"

/**
 * Elapsed recording time. Pass the seconds from your own clock; the
 * component only formats. `compact` drops the hours (mm:ss).
 */
function RecordingTimer({
  seconds,
  compact = false,
  className,
}: {
  seconds: number
  compact?: boolean
  className?: string
}) {
  return (
    <time
      dateTime={`PT${Math.floor(seconds)}S`}
      className={cn("font-medium tabular-nums", className)}
    >
      {compact ? formatElapsed(seconds) : formatDuration(seconds)}
    </time>
  )
}

export { RecordingTimer }
