import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface EventOrganizer {
  name: string
  affiliation?: string
  href?: string
}

export interface EventScheduleItem {
  duration: string
  title: string
  description?: string
}

export interface EventImportantDate {
  label: string
  date: string
}

export interface EventDetailData {
  title: string
  conference: string
  year: number
  status: "upcoming" | "past"
  about: string[]
  topics?: string[]
  importantDates?: EventImportantDate[]
  schedule?: EventScheduleItem[]
  organizers: EventOrganizer[]
  toolLink?: { label: string; href: string }
}

export interface EventDetailProps {
  event: EventDetailData
}

export function EventDetail({ event }: EventDetailProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex items-center gap-3">
          <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
            {event.status === "upcoming" ? "Upcoming" : "Past"}
          </Badge>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {event.conference} · {event.year}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          {event.title}
        </h1>

        {event.toolLink ? (
          <Button className="mt-6" asChild>
            <a href={event.toolLink.href}>
              {event.toolLink.label}
              <ArrowUpRight />
            </a>
          </Button>
        ) : null}

        <div className="mt-10 flex flex-col gap-4">
          {event.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {event.topics && event.topics.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Topics
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {event.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-xl border border-border px-3 py-2 text-sm text-foreground"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {event.importantDates && event.importantDates.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Important dates
            </h2>
            <ul className="mt-3 flex flex-col gap-2 border-t border-border">
              {event.importantDates.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between border-b border-border py-2.5 text-sm"
                >
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-mono text-muted-foreground">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {event.schedule && event.schedule.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Schedule
            </h2>
            <ol className="mt-3 flex flex-col gap-4 border-t border-border pt-4">
              {event.schedule.map((item, i) => (
                <li key={i} className="grid grid-cols-[5rem_1fr] gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{item.duration}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-10">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Organizers
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {event.organizers.map((organizer) => (
              <div
                key={organizer.name}
                className="rounded-2xl border border-border p-4"
              >
                {organizer.href ? (
                  <a href={organizer.href} className="text-sm font-medium text-foreground hover:text-primary">
                    {organizer.name}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{organizer.name}</p>
                )}
                {organizer.affiliation ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{organizer.affiliation}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
