import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { SectionLabel } from "@/components/patterns/section-label"

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
  const nameInitials = initials(person.name)

  return (
    <section
      data-slot="person-profile"
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-[12rem_1fr] sm:items-start">
          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card bg-muted">
            {person.image ? (
              <img
                src={person.image}
                alt={person.name}
                className="size-full object-cover"
              />
            ) : (
              <span className="font-heading text-4xl text-muted-foreground">
                {nameInitials}
              </span>
            )}
          </div>

          <div>
            <Badge variant="secondary">{person.category}</Badge>
            <h1 className="mt-4 text-h2 text-foreground md:text-h1">
              {person.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {person.designation}
            </p>

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
                  <a
                    href={person.advisorUrl}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {person.advisor}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">
                    {person.advisor}
                  </span>
                )}
              </p>
            ) : null}

            {person.bio ? (
              <p className="mt-8 max-w-prose leading-relaxed text-foreground">
                {person.bio}
              </p>
            ) : null}

            {person.research && person.research.length > 0 ? (
              <div className="mt-10">
                <SectionLabel asChild>
                  <h2>Research areas</h2>
                </SectionLabel>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {person.research.map((area) => (
                    <Item key={area.id} variant="outline" asChild>
                      <a href={`/research/${area.id}`}>
                        <ItemContent>
                          <ItemTitle className="line-clamp-none">
                            {area.title}
                          </ItemTitle>
                        </ItemContent>
                      </a>
                    </Item>
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
