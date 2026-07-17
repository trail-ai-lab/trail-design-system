import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface FocusArea {
  icon: LucideIcon
  tag: string
  title: string
  body: string
}

export interface FocusAreasProps {
  eyebrow: string
  title: React.ReactNode
  items: FocusArea[]
  className?: string
}

/**
 * Homepage section alternating icon/text panels, one per focus area.
 * Presentational only — pass `items` describing each area.
 */
export function FocusAreas({ eyebrow, title, items, className }: FocusAreasProps) {
  return (
    <section className={cn("border-b border-border bg-accent/40", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-16 md:gap-20">
          {items.map((area, i) => {
            const reversed = i % 2 === 1
            const Icon = area.icon
            return (
              <article
                key={area.title}
                className="grid items-center gap-10 lg:grid-cols-12"
              >
                <figure
                  className={`lg:col-span-5 ${
                    reversed ? "lg:col-start-8 lg:row-start-1" : ""
                  }`}
                >
                  <div className="flex aspect-square items-center justify-center rounded-4xl bg-card ring-1 ring-foreground/5">
                    <Icon className="size-16 text-primary" strokeWidth={1.25} />
                  </div>
                </figure>
                <div
                  className={`lg:col-span-6 ${
                    reversed ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <Badge variant="secondary">{area.tag}</Badge>
                  <h3 className="mt-4 font-heading text-2xl tracking-tight text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                    {area.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
