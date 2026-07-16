import { Badge } from "@/components/ui/badge"

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
}

export function EventCard({ event }: EventCardProps) {
  return (
    <a
      href={event.href}
      className="flex flex-col gap-3 rounded-4xl border border-border bg-card p-6 transition-colors hover:bg-accent"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {event.conference} · {event.year}
        </span>
        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
          {event.status === "upcoming" ? "Upcoming" : "Past"}
        </Badge>
      </div>
      <h3 className="font-heading text-lg text-foreground">{event.title}</h3>
    </a>
  )
}
