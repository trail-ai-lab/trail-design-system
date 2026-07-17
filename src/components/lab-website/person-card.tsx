import { cn } from "@/lib/utils"
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
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <Card className={cn("relative transition-colors hover:bg-accent", className)}>
      <a
        href={`/people/${person.id}`}
        className="absolute inset-0"
        aria-label={person.name}
      />
      <CardContent className="flex flex-col gap-4">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-muted">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="size-full object-cover"
            />
          ) : (
            <span className="font-heading text-2xl text-muted-foreground">{initials}</span>
          )}
        </div>
        <div>
          <CardTitle className="group-hover/card:text-primary">
            {person.name}
          </CardTitle>
          <CardDescription className="mt-1">{person.designation}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
