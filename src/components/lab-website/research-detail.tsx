import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
export function ResearchDetail({ research, className, publications }: ResearchDetailProps) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Research
        </span>

        <h1 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          {research.title}
        </h1>

        {research.funders && research.funders.length > 0 ? (
          <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
            Funded by {research.funders.join(" · ")}
          </p>
        ) : null}

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          {research.content}
        </div>

        {research.people && research.people.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              People
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {research.people.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-3 rounded-2xl border border-border p-4"
                >
                  <Avatar size="lg">
                    <AvatarImage src={person.image} alt={person.name} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    {person.href ? (
                      <a
                        href={person.href}
                        className="text-sm font-medium text-foreground hover:text-primary"
                      >
                        {person.name}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{person.name}</p>
                    )}
                    {person.designation ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{person.designation}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {publications}
    </section>
  )
}
