import { cn } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export interface ResearchCardItem {
  index: string
  title: string
  funders: string[]
  /**
   * Destination for the whole-card link. Omit to render a static card —
   * useful while an area's detail page doesn't exist yet. Leaving it out
   * also drops the hover affordances, so the card doesn't advertise a
   * click that goes nowhere.
   */
  href?: string
}

export interface ResearchCardProps {
  research: ResearchCardItem
  className?: string
}

/**
 * Card for one research area/project in a grid (index, title, funders) —
 * the Research listing page. For a downloadable tool, dataset, or event
 * writeup, use ResourceCard instead; for an academic citation list, use
 * PublicationList.
 */
export function ResearchCard({ research, className }: ResearchCardProps) {
  const isLinked = Boolean(research.href)

  return (
    <Card className={cn("relative", isLinked && "transition-colors hover:bg-accent", className)}>
      {research.href ? (
        <a href={research.href} className="absolute inset-0" aria-label={research.title} />
      ) : null}
      <CardContent className="flex flex-1 flex-col gap-6">
        <span className="font-mono text-xs text-muted-foreground">{research.index}</span>
        <CardTitle className={cn("text-xl tracking-tight", isLinked && "group-hover/card:text-primary")}>
          {research.title}
        </CardTitle>
        {research.funders.length > 0 ? (
          <p className="mt-auto text-xs uppercase tracking-wider text-muted-foreground">
            Funded by {research.funders.join(" · ")}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
