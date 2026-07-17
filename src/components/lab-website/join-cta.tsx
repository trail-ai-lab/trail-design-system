import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface JoinCtaProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
  className?: string
  /** Full-bleed absolute-positioned layer behind the content (e.g. an
   * ambient background illustration). Rendered first, before the content. */
  backdrop?: React.ReactNode
}

/**
 * Closing call-to-action section (centered, two CTAs) — used near the
 * bottom of the homepage. For the pull-quote treatment instead, use
 * PullQuote.
 */
export function JoinCta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  backdrop,
}: JoinCtaProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      {backdrop}
      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
      </div>
    </section>
  )
}
