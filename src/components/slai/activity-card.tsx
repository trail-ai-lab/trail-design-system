import { ShapesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SessionActivity } from "@/components/slai/activity-picker"

/**
 * A single interactive activity in the Activities catalog: icon + name,
 * description, and topic tags. Presentational — for selecting an activity in
 * a session, use ActivityPicker instead.
 */
function ActivityCard({
  activity,
  className,
}: {
  activity: SessionActivity
  className?: string
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShapesIcon className="size-4 shrink-0 text-muted-foreground" />
          {activity.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <CardDescription>{activity.description}</CardDescription>
        {activity.tags && activity.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {activity.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ActivityCard }
