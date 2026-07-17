import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export interface EventCardItem {
  id: string
  title: string
  conference: string
  year: number
  status: "upcoming" | "past"
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
    <Card className={cn("relative transition-colors hover:bg-accent", className)}>
      <a href={event.href} className="absolute inset-0" aria-label={event.title} />
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {event.conference} · {event.year}
          </span>
          <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
            {event.status === "upcoming" ? "Upcoming" : "Past"}
          </Badge>
        </div>
        <CardTitle className="text-lg">{event.title}</CardTitle>
      </CardContent>
    </Card>
  )
}
