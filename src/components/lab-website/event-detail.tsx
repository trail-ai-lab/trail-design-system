import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Hash,
  MapPin,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { PersonRow } from "@/components/patterns/person-row"
import { SectionLabel } from "@/components/patterns/section-label"
import { EventStatusBadge, type EventStatus } from "./event-status-badge"

export interface EventOrganizer {
  name: string
  affiliation?: string
  href?: string
  image?: string
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

export interface EventConferenceInfo {
  name: string
  venue: string
  city: string
  country: string
  dates: string
  theme?: string
  link: string
}

export interface EventSessionDetails {
  code?: string
  location?: string
  date?: string
  time?: string
}

export interface EventSubmissionType {
  title: string
  description: string
}

export interface EventSubmissionGuidelines {
  intro?: string
  types?: EventSubmissionType[]
  format?: string[]
  portalLink?: string
  portalLabel?: string
}

export interface EventRelatedPaper {
  id: string
  title: string
  publisher: string
  year: number
  link?: string
}

export interface EventDetailData {
  title: string
  conference: string
  year: number
  status: EventStatus
  about: string[]
  topics?: string[]
  importantDates?: EventImportantDate[]
  schedule?: EventScheduleItem[]
  organizers: EventOrganizer[]
  toolLink?: { label: string; href: string }
  conferenceInfo?: EventConferenceInfo
  session?: EventSessionDetails
  callForParticipation?: string[]
  submissionGuidelines?: EventSubmissionGuidelines
  relatedPapers?: EventRelatedPaper[]
}

export interface EventDetailProps {
  event: EventDetailData
  className?: string
  /** Extra actions rendered next to the toolLink button, e.g. an RSVP button. */
  actions?: React.ReactNode
}

/**
 * Full single-page layout for one tutorial or workshop — status, topics,
 * important dates, schedule, and organizers. For the compact card used on
 * the listing page, use EventCard instead.
 */
export function EventDetail({ event, className, actions }: EventDetailProps) {
  const hasSession = Boolean(
    event.session &&
    (event.session.code ||
      event.session.location ||
      event.session.date ||
      event.session.time)
  )

  return (
    <section
      data-slot="event-detail"
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="flex items-center gap-3">
          <EventStatusBadge status={event.status} />
          <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {event.conference} · {event.year}
          </span>
        </div>

        <h1 className="mt-4 text-h2 text-foreground md:text-h1">
          {event.title}
        </h1>

        {event.toolLink || actions ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {event.toolLink ? (
              <Button asChild>
                <a href={event.toolLink.href}>
                  {event.toolLink.label}
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
            {actions}
          </div>
        ) : null}

        {event.conferenceInfo ? (
          <Item variant="muted" className="mt-10 flex-col items-stretch gap-3">
            <a
              href={event.conferenceInfo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:underline"
            >
              {event.conferenceInfo.name}
              <ExternalLink className="size-3.5 shrink-0" />
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 shrink-0" />
                {event.conferenceInfo.venue}, {event.conferenceInfo.city},{" "}
                {event.conferenceInfo.country}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 shrink-0" />
                {event.conferenceInfo.dates}
              </span>
            </div>
            {event.conferenceInfo.theme ? (
              <p className="text-xs text-muted-foreground italic">
                Theme: &ldquo;{event.conferenceInfo.theme}&rdquo;
              </p>
            ) : null}

            {hasSession ? (
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-3 text-sm text-muted-foreground">
                {event.session?.code ? (
                  <span className="flex items-center gap-1.5">
                    <Hash className="size-4 shrink-0" />
                    {event.session.code}
                  </span>
                ) : null}
                {event.session?.location ? (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0" />
                    {event.session.location}
                  </span>
                ) : null}
                {event.session?.date ? (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4 shrink-0" />
                    {event.session.date}
                  </span>
                ) : null}
                {event.session?.time ? (
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 shrink-0" />
                    {event.session.time}
                  </span>
                ) : null}
              </div>
            ) : null}
          </Item>
        ) : null}

        <div className="mt-10 flex flex-col gap-4">
          {event.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {event.callForParticipation && event.callForParticipation.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>Call for participation</h2>
            </SectionLabel>
            <div className="mt-3 flex flex-col gap-4">
              {event.callForParticipation.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {event.topics && event.topics.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>Topics</h2>
            </SectionLabel>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {event.topics.map((topic) => (
                <Item key={topic} variant="outline" size="xs" asChild>
                  <li>{topic}</li>
                </Item>
              ))}
            </ul>
          </div>
        ) : null}

        {event.importantDates && event.importantDates.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>Important dates</h2>
            </SectionLabel>
            <ul className="mt-3 flex flex-col gap-2">
              {event.importantDates.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between border-t border-border py-2.5 text-sm first:border-t-0"
                >
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-mono text-muted-foreground">
                    {item.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {event.submissionGuidelines ? (
          <div className="mt-10 flex flex-col gap-4">
            <SectionLabel asChild>
              <h2>Submission guidelines</h2>
            </SectionLabel>
            {event.submissionGuidelines.intro ? (
              <p className="leading-relaxed text-foreground">
                {event.submissionGuidelines.intro}
              </p>
            ) : null}
            {event.submissionGuidelines.types &&
            event.submissionGuidelines.types.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {event.submissionGuidelines.types.map((type) => (
                  <Item
                    key={type.title}
                    variant="outline"
                    className="items-start"
                  >
                    <ItemContent>
                      <ItemTitle>{type.title}</ItemTitle>
                      <ItemDescription className="line-clamp-none">
                        {type.description}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            ) : null}
            {event.submissionGuidelines.format &&
            event.submissionGuidelines.format.length > 0 ? (
              <ul className="flex flex-col gap-1.5">
                {event.submissionGuidelines.format.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            {event.submissionGuidelines.portalLink ? (
              <Button variant="outline" className="w-fit" asChild>
                <a
                  href={event.submissionGuidelines.portalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.submissionGuidelines.portalLabel ??
                    "Submission portal"}
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}

        {event.schedule && event.schedule.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>Schedule</h2>
            </SectionLabel>
            <ol className="mt-3 flex flex-col gap-4 border-t border-border pt-4">
              {event.schedule.map((item, i) => (
                <li key={i} className="grid grid-cols-[5rem_1fr] gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.duration}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    {item.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {event.relatedPapers && event.relatedPapers.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>
                {event.relatedPapers.length === 1
                  ? "Related paper"
                  : "Related papers"}
              </h2>
            </SectionLabel>
            <ul className="mt-3 flex flex-col gap-3">
              {event.relatedPapers.map((paper) => (
                <Item key={paper.id} variant="outline" asChild>
                  <li>
                    <ItemContent>
                      <ItemTitle className="line-clamp-none">
                        {paper.title}
                      </ItemTitle>
                      <ItemDescription>
                        {paper.publisher} · {paper.year}
                      </ItemDescription>
                    </ItemContent>
                    {paper.link ? (
                      <ItemActions>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto px-0"
                          asChild
                        >
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View paper
                            <ExternalLink data-icon="inline-end" />
                          </a>
                        </Button>
                      </ItemActions>
                    ) : null}
                  </li>
                </Item>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10">
          <SectionLabel asChild>
            <h2>Organizers</h2>
          </SectionLabel>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {event.organizers.map((organizer) => (
              <PersonRow
                key={organizer.name}
                variant="outline"
                name={organizer.name}
                description={organizer.affiliation}
                image={organizer.image}
                href={organizer.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
