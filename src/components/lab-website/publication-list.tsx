export interface Publication {
  id: string
  title: string
  authors: string[]
  year: string
  publisher: string
  link?: string
}

export interface PublicationListProps {
  items: Publication[]
}

function groupByYear(items: Publication[]) {
  const years = Array.from(new Set(items.map((item) => item.year))).sort(
    (a, b) => Number(b) - Number(a)
  )
  return years.map((year) => ({
    year,
    items: items.filter((item) => item.year === year),
  }))
}

export function PublicationList({ items }: PublicationListProps) {
  const groups = groupByYear(items)

  return (
    <div className="flex flex-col">
      {groups.map((group) => (
        <div
          key={group.year}
          className="grid grid-cols-1 gap-3 border-t border-border py-8 first:border-t-0 md:grid-cols-[8rem_1fr] md:gap-10"
        >
          <p className="font-mono text-sm text-muted-foreground">{group.year}</p>
          <ul className="flex flex-col gap-6">
            {group.items.map((pub) => (
              <li key={pub.id}>
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-medium text-foreground hover:text-primary"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <p className="text-base font-medium text-foreground">{pub.title}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {pub.authors.join(", ")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground italic">
                  {pub.publisher}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
