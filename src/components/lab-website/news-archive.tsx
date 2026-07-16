export interface NewsEntry {
  date: string
  text: React.ReactNode
}

export interface NewsArchiveProps {
  items: NewsEntry[]
}

export function NewsArchive({ items }: NewsArchiveProps) {
  return (
    <ul className="border-t border-border">
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-1 gap-2 border-b border-border py-6 md:grid-cols-[10rem_1fr] md:gap-8 md:py-7"
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
