import { cn } from "@/lib/utils"

export interface NewsEntry {
  date: string
  text: React.ReactNode
}

export interface NewsArchiveProps {
  items: NewsEntry[]
  /** Width of the date column at md+ breakpoints, e.g. "8rem" or "10rem" */
  columnWidth?: string
  className?: string
}

/**
 * Full, unbounded list of news entries, grouped only by a date column — the
 * dedicated News page. For a compact "most recent + view all" preview
 * embedded elsewhere (e.g. the homepage), use RecentNews instead, which
 * composes this component with a narrower date column.
 */
export function NewsArchive({
  items,
  columnWidth = "10rem",
  className,
}: NewsArchiveProps) {
  return (
    <ul
      className={cn("border-t border-border", className)}
      style={{ "--news-column-width": columnWidth } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-1 gap-2 border-b border-border py-6 md:grid-cols-[var(--news-column-width)_1fr] md:gap-8 md:py-7"
        >
          <time className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {item.date}
          </time>
          <p className="text-base leading-relaxed text-foreground">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
