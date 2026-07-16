export interface Person {
  id: string
  name: string
  designation: string
  image?: string
}

export interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <a
      href={`/people/${person.id}`}
      className="group flex flex-col gap-4 rounded-4xl border border-border bg-card p-5 transition-colors hover:bg-accent"
    >
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
        <h3 className="font-heading text-base text-foreground group-hover:text-primary">
          {person.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{person.designation}</p>
      </div>
    </a>
  )
}
