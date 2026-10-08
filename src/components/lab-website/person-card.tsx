import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import { CardLink } from "@/components/patterns/card-link"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

export interface Person {
  id: string
  name: string
  designation: string
  image?: string
  advisor?: string
  advisorUrl?: string
}

export interface PersonCardProps {
  person: Person
  className?: string
}

/**
 * Compact card for one person in a grid — the People listing page. For the
 * full single-person profile page, use PersonProfile instead.
 */
export function PersonCard({ person, className }: PersonCardProps) {
  const nameInitials = initials(person.name)

  return (
    <Card
      className={cn("relative transition-colors hover:bg-accent", className)}
    >
      <CardLink href={`/people/${person.id}`} label={person.name} />
      <CardContent className="flex flex-col gap-4">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-muted">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="size-full object-cover"
            />
          ) : (
            <span className="font-heading text-2xl text-muted-foreground">
              {nameInitials}
            </span>
          )}
        </div>
        <div>
          <CardTitle className="group-hover/card:text-primary">
            {person.name}
          </CardTitle>
          <CardDescription className="mt-1">
            {person.designation}
          </CardDescription>
          {person.advisor ? (
            <p className="relative z-10 mt-2 text-sm text-muted-foreground">
              Advisor:{" "}
              {person.advisorUrl ? (
                <a
                  href={person.advisorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-from-font underline-offset-4 hover:text-foreground"
                >
                  {person.advisor}
                </a>
              ) : (
                person.advisor
              )}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
