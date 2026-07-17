import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface PersonProfileData {
  id: string
  name: string
  designation: string
  category: string
  image?: string
  website?: string
  bio?: string
  advisor?: string
  advisorUrl?: string
  research?: { id: string; title: string }[]
}

export interface PersonProfileProps {
  person: PersonProfileData
  className?: string
}

/**
 * Full single-page profile for one person — photo, bio, advisor, and
 * research areas. For the compact card used on the listing page, use
 * PersonCard instead.
 */
export function PersonProfile({ person, className }: PersonProfileProps) {
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <section className={cn("border-b border-border", className)}>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-[12rem_1fr] sm:items-start">
          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-4xl bg-muted">
            {person.image ? (
              <img src={person.image} alt={person.name} className="size-full object-cover" />
            ) : (
              <span className="font-heading text-4xl text-muted-foreground">{initials}</span>
            )}
          </div>

          <div>
            <Badge variant="secondary">{person.category}</Badge>
            <h1 className="mt-4 font-heading text-3xl tracking-tight text-foreground">
              {person.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{person.designation}</p>

            {person.website ? (
              <Button variant="outline" className="mt-6" asChild>
                <a href={person.website} target="_blank" rel="noreferrer">
                  Visit website
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}

            {person.advisor ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Advised by{" "}
                {person.advisorUrl ? (
                  <a href={person.advisorUrl} className="font-medium text-foreground hover:text-primary">
                    {person.advisor}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{person.advisor}</span>
                )}
              </p>
            ) : null}

            {person.bio ? (
              <p className="mt-8 max-w-prose leading-relaxed text-foreground">{person.bio}</p>
            ) : null}

            {person.research && person.research.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Research areas
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {person.research.map((area) => (
                    <a
                      key={area.id}
                      href={`/research/${area.id}`}
                      className="rounded-2xl border border-border p-4 text-sm font-medium text-foreground hover:bg-accent hover:text-primary"
                    >
                      {area.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
