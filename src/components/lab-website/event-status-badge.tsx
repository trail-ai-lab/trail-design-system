import { StatusBadge } from "@/components/patterns/status-badge"

export type EventStatus = "upcoming" | "past"

/** "Upcoming" (primary) or "Past" (muted) status for an event or workshop. */
export function EventStatusBadge({
  status,
  className,
}: {
  status: EventStatus
  className?: string
}) {
  return (
    <StatusBadge
      tone={status === "upcoming" ? "primary" : "muted"}
      data-slot="event-status-badge"
      className={className}
    >
      {status === "upcoming" ? "Upcoming" : "Past"}
    </StatusBadge>
  )
}
