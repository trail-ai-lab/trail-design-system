export interface ResearchCardItem {
  index: string
  title: string
  funders: string[]
  href: string
}

export interface ResearchCardProps {
  item: ResearchCardItem
}

export function ResearchCard({ item }: ResearchCardProps) {
  return (
    <a
      href={item.href}
      className="group flex flex-col gap-6 rounded-4xl border border-border bg-card p-6 transition-colors hover:bg-accent"
    >
      <span className="font-mono text-xs text-muted-foreground">{item.index}</span>
      <h3 className="font-heading text-xl tracking-tight text-foreground group-hover:text-primary">
        {item.title}
      </h3>
      {item.funders.length > 0 ? (
        <p className="mt-auto text-xs uppercase tracking-wider text-muted-foreground">
          Funded by {item.funders.join(" · ")}
        </p>
      ) : null}
    </a>
  )
}
