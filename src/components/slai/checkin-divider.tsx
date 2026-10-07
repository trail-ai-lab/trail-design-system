import { cn } from "@/lib/utils"

/**
 * Dashed divider labeled "Checked in · time", placed inside a transcript at
 * the point where the teacher ran a comprehension check-in.
 */
function CheckinDivider({
  time,
  label = "Checked in",
  className,
}: {
  time?: string
  label?: string
  className?: string
}) {
  return (
    <div
      role="separator"
      aria-label={time ? `${label} at ${time}` : label}
      className={cn(
        "flex items-center gap-3 text-xs text-muted-foreground",
        className
      )}
    >
      <span className="h-px flex-1 border-t border-dashed border-border" />
      <span className="shrink-0">
        {label}
        {time && <> · <span className="tabular-nums">{time}</span></>}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-border" />
    </div>
  )
}

export { CheckinDivider }
