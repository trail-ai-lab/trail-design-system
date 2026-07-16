import type { LucideIcon } from "lucide-react"

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
}

export function Pillars({ eyebrow, title, items }: PillarsProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-4xl bg-border ring-1 ring-foreground/5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.index}
                className="group flex flex-col gap-6 bg-card p-6 transition-colors hover:bg-accent"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.index}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground">
                    {item.title}
                  </h3>
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
