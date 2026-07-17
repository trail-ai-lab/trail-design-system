import { cn } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export interface ResearchCardItem {
  index: string
  title: string
  funders: string[]
  href: string
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
  return (
    <Card className={cn("relative transition-colors hover:bg-accent", className)}>
      <a href={research.href} className="absolute inset-0" aria-label={research.title} />
      <CardContent className="flex flex-1 flex-col gap-6">
        <span className="font-mono text-xs text-muted-foreground">{research.index}</span>
        <CardTitle className="text-xl tracking-tight group-hover/card:text-primary">
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
