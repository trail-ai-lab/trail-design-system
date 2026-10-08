import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/patterns/card-link"
import { EventStatusBadge, type EventStatus } from "./event-status-badge"

export interface EventCardItem {
  id: string
  title: string
  conference: string
  year: number
  status: EventStatus
  href: string
}

export interface EventCardProps {
  event: EventCardItem
  className?: string
}

/**
 * Compact card for one tutorial/workshop in a grid — the Tutorials/Workshops
 * listing page. For the full single-event page (schedule, organizers,
 * important dates), use EventDetail instead.
 */
export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card
      className={cn("relative transition-colors hover:bg-accent", className)}
    >
      <CardLink href={event.href} label={event.title} />
      <CardHeader>
        <CardDescription className="font-mono text-xs tracking-wider uppercase">
          {event.conference} · {event.year}
        </CardDescription>
        <CardTitle>{event.title}</CardTitle>
        <CardAction>
          <EventStatusBadge status={event.status} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
