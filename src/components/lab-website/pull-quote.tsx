import { Quote } from "lucide-react"

import { cn } from "@/lib/utils"

export interface PullQuoteProps {
  eyebrow: string
  quote: React.ReactNode
  cite: string
  className?: string
}

/**
 * Large decorative pull-quote section — used on the homepage. Defaults to a
 * solid primary-color background; pass `className` with your own background
 * and text color utilities to use a different tone (children use
 * text-current with opacity modifiers, so the override cascades to them
 * automatically). For the closing two-CTA section instead, use JoinCta.
 */
export function PullQuote({ eyebrow, quote, cite, className }: PullQuoteProps) {
  return (
    <section
      data-slot="pull-quote"
      className={cn(
        "relative overflow-hidden border-b border-border bg-primary text-primary-foreground",
        className
      )}
    >
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-10 hidden size-[22rem] -translate-y-1/2 opacity-10 md:block"
        strokeWidth={0.75}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 lg:px-8">
        <p className="text-xs font-medium tracking-wider text-current uppercase">
          {eyebrow}
        </p>
        <blockquote className="mt-8">
          {/* eslint-disable-next-line trail/no-arbitrary-values -- Lab Website brand size kept as-is; decide whether it maps to the type scale */}
          <p className="font-heading text-[clamp(1.5rem,2.5vw+1rem,2.5rem)] leading-[1.2] tracking-tight text-current">
            {quote}
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-current opacity-40"
            />
            <cite className="font-mono text-xs tracking-wider text-current uppercase not-italic">
              {cite}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
