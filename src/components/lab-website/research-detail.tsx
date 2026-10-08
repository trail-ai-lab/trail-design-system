import { cn } from "@/lib/utils"
import { PersonRow } from "@/components/patterns/person-row"
import { SectionLabel } from "@/components/patterns/section-label"

export interface ResearchPerson {
  name: string
  designation?: string
  href?: string
  image?: string
}

export interface ResearchDetailData {
  title: string
  funders?: string[]
  /** Rendered body — markdown/MDX turned into HTML, or plain JSX. */
  content: React.ReactNode
  people?: ResearchPerson[]
}

export interface ResearchDetailProps {
  research: ResearchDetailData
  className?: string
  /** Slot for a related-publications list, e.g. a PublicationList. */
  publications?: React.ReactNode
}

/**
 * Full single-page layout for one research area — title, funders, prose
 * body, associated people, and an optional publications slot. For the
 * compact card used on the Research listing page, use ResearchCard instead.
 */
export function ResearchDetail({
  research,
  className,
  publications,
}: ResearchDetailProps) {
  return (
    <section
      data-slot="research-detail"
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Research
        </span>

        <h1 className="mt-4 text-h2 text-foreground md:text-h1">
          {research.title}
        </h1>

        {research.funders && research.funders.length > 0 ? (
          <p className="mt-4 text-xs tracking-wider text-muted-foreground uppercase">
            Funded by {research.funders.join(" · ")}
          </p>
        ) : null}

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
          {research.content}
        </div>

        {research.people && research.people.length > 0 ? (
          <div className="mt-10">
            <SectionLabel asChild>
              <h2>People</h2>
            </SectionLabel>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {research.people.map((person) => (
                <PersonRow
                  key={person.name}
                  variant="outline"
                  name={person.name}
                  description={person.designation}
                  image={person.image}
                  href={person.href}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {publications}
    </section>
  )
}
