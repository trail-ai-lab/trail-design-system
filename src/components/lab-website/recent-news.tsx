import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NewsArchive, type NewsEntry } from "@/components/lab-website/news-archive"

export interface RecentNewsProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  items: NewsEntry[]
  viewAllHref: string
  totalCount: number
  className?: string
}

/**
 * Homepage-only preview of the most recent news entries plus a "view all"
 * link and total count — composes NewsArchive internally with a narrower
 * date column. For the full, unbounded news list, use NewsArchive directly
 * on the dedicated News page.
 */
export function RecentNews({
  eyebrow,
  title,
  description,
  items,
  viewAllHref,
  totalCount,
  className,
}: RecentNewsProps) {
  return (
    <section className={cn("border-b border-border", className)}>
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

        <NewsArchive items={items} columnWidth="8rem" className="mt-12" />

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
