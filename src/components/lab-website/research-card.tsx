import { cn } from "@/lib/utils"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/patterns/card-link"

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
    <Card
      className={cn(
        "relative",
        isLinked && "transition-colors hover:bg-accent",
        className
      )}
    >
      {research.href ? (
        <CardLink href={research.href} label={research.title} />
      ) : null}
      <CardHeader className="gap-3">
        <CardDescription className="font-mono text-xs">
          {research.index}
        </CardDescription>
        <CardTitle className={cn(isLinked && "group-hover/card:text-primary")}>
          {research.title}
        </CardTitle>
      </CardHeader>
      {research.funders.length > 0 ? (
        <CardFooter className="mt-auto">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Funded by {research.funders.join(" · ")}
          </p>
        </CardFooter>
      ) : null}
    </Card>
  )
}
