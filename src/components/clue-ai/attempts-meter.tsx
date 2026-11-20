import { cn } from "@/lib/utils"

/**
 * How many team verdicts the case allows before the final call is forced: a
 * row of segments (used ones filled) and a line saying what's left. When none
 * are left the line turns `warning` and points at the final call.
 */
function AttemptsMeter({
  used,
  max,
  className,
}: {
  used: number
  max: number
  className?: string
}) {
  const left = Math.max(max - used, 0)
  return (
    <div
      data-slot="attempts-meter"
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-body-sm font-medium">Team verdicts</span>
        <span className="text-body-sm text-muted-foreground tabular-nums">
          <span className="font-medium text-foreground">{used}</span> of {max}{" "}
          used
        </span>
      </div>
      <div
        role="meter"
        aria-label="Team verdicts used"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={used}
        className="flex gap-1"
      >
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-1.5 flex-1 rounded-full bg-muted",
              i < used && (left === 0 ? "bg-warning" : "bg-foreground")
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-caption text-muted-foreground",
          left === 0 && "font-medium text-warning"
        )}
      >
        {left === 0
          ? "No verdicts left — only the final call remains."
          : `${left} left before the final call.`}
      </p>
    </div>
  )
}

export { AttemptsMeter }
