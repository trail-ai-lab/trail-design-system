import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { IconTile } from "@/components/patterns/icon-tile"
import { SectionLabel } from "@/components/patterns/section-label"

export interface Pillar {
  icon: LucideIcon
  index: string
  title: string
  body: string
}

export interface PillarsProps {
  eyebrow: string
  title: React.ReactNode
  items: Pillar[]
  className?: string
}

/**
 * Homepage section presenting the lab's pillars/principles as a card grid,
 * each with a numbered index and icon. Presentational only.
 */
export function Pillars({ eyebrow, title, items, className }: PillarsProps) {
  return (
    <section
      data-slot="pillars"
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <SectionLabel asChild>
          <p>{eyebrow}</p>
        </SectionLabel>
        <h2 className="mt-4 max-w-2xl text-h2 text-foreground md:text-h1">
          {title}
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-border ring-1 ring-foreground/5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.index}
                className="group flex flex-col gap-6 bg-card p-6 transition-colors hover:bg-accent"
              >
                <div className="flex items-start justify-between">
                  <IconTile variant="primary">
                    <Icon />
                  </IconTile>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.index}
                  </span>
                </div>
                <div>
                  <h3 className="text-h3 text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
