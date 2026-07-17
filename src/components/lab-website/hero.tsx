import { ArrowRight, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface HeroProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
  meta: { label: string; value: string }[]
  className?: string
  /** Full-bleed absolute-positioned layer behind the content grid (e.g. an
   * ambient background illustration). Rendered first, before the grid. */
  backdrop?: React.ReactNode
  /** Overrides the default right-column placeholder card with custom
   * content (e.g. a bespoke illustration). */
  visual?: React.ReactNode
}

/**
 * Homepage's top banner: eyebrow, headline, description, two CTAs, and a
 * stat row. Homepage-specific — for a secondary page's top banner (Research,
 * Resources, People, ...), use PageHeader instead.
 */
export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  meta,
  className,
  backdrop,
  visual,
}: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      {backdrop}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-7">
          <Badge variant="outline" className="gap-1.5 py-1">
            <Sparkles className="size-3" />
            {eyebrow}
          </Badge>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={secondaryAction.href}>{secondaryAction.label}</a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-2 gap-8">
            {meta.map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-2 font-heading text-lg text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          {visual ?? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-card ring-1 ring-foreground/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[length:24px_24px] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/80 p-4 backdrop-blur ring-1 ring-foreground/5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fig. 01
                </p>
                <p className="mt-1 text-sm text-foreground">
                  A classroom moment, studied closely.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
