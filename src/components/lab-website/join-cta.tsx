import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface JoinCtaProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
}

export function JoinCta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: JoinCtaProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28 lg:px-8">
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
