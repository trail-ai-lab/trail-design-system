import { cn } from "@/lib/utils"
import { Item, ItemContent, ItemMedia } from "@/components/ui/item"
import { SectionLabel } from "@/components/patterns/section-label"

/**
 * A student's words pulled from the transcript, with an optional translation
 * for non-English speech. Used in insight and evidence cards.
 */
function TranscriptQuote({
  label,
  quote,
  translation,
  className,
}: {
  /** Attribution line, e.g. "Mei said" */
  label?: string
  quote: string
  translation?: string
  className?: string
}) {
  return (
    <blockquote
      data-slot="transcript-quote"
      className={cn(
        "flex flex-col gap-0.5 border-l-2 border-border pl-3",
        className
      )}
    >
      {label && (
        <SectionLabel asChild>
          <p>{label}</p>
        </SectionLabel>
      )}
      <p className="text-sm italic">&ldquo;{quote}&rdquo;</p>
      {translation && (
        <p className="text-xs text-muted-foreground italic">{translation}</p>
      )}
    </blockquote>
  )
}

/**
 * Muted inset with a leading icon: a cultural connection, a suggested next
 * step, a tip. Built on `Item variant="muted"`.
 */
function InsightItem({
  icon,
  label,
  children,
  className,
}: {
  /** Leading icon element; color it to carry meaning, e.g. `text-info` */
  icon: React.ReactNode
  /** Small label above the text, e.g. "Cultural connection" */
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Item variant="muted" size="sm" className={className}>
      <ItemMedia variant="icon" className="self-start">
        {icon}
      </ItemMedia>
      <ItemContent>
        {label && (
          <SectionLabel asChild>
            <p>{label}</p>
          </SectionLabel>
        )}
        <div className="text-sm">{children}</div>
      </ItemContent>
    </Item>
  )
}

export { InsightItem, TranscriptQuote }
