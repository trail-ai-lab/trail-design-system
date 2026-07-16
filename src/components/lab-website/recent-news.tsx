import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface NewsItem {
  date: string
  text: React.ReactNode
}

export interface RecentNewsProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  items: NewsItem[]
  viewAllHref: string
  totalCount: number
}

export function RecentNews({
  eyebrow,
  title,
  description,
  items,
  viewAllHref,
  totalCount,
}: RecentNewsProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-prose text-muted-foreground lg:col-span-4 lg:col-start-9">
            {description}
          </p>
        </div>

        <ul className="mt-12 border-t border-border">
          {items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-border py-6 md:grid-cols-[8rem_1fr] md:gap-8 md:py-7"
            >
              <time className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.date}
              </time>
              <p className="text-base leading-relaxed text-foreground">
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="link" className="h-auto px-0" asChild>
            <a href={viewAllHref}>
              All news
              <ArrowRight />
            </a>
          </Button>
          <p className="font-mono text-xs text-muted-foreground">
            {totalCount} entries total
          </p>
        </div>
      </div>
    </section>
  )
}
