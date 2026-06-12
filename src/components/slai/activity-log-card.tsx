"use client"

import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export interface ActivityLogEvent {
  id: string
  icon: LucideIcon
  /** What ran, e.g. "Inclined Plane" */
  title: string
  /** What changed, e.g. "Ramp angle 15° → 30°" */
  detail?: string
  /** Formatted time, e.g. "3:42 PM" */
  time?: string
  /** Optional trailing value, e.g. "3 runs" */
  value?: string
}

/**
 * Log of what happened in the session's activity — which trails were run
 * and which simulation values students changed, in order.
 */
function ActivityLogCard({
  events,
  scopeLabel,
  className,
}: {
  events: ActivityLogEvent[]
  /** Label of the active scope, e.g. "Group 1" */
  scopeLabel?: string
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activity log</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {events.map((event) => {
              const Icon = event.icon
              return (
                <TableRow key={event.id}>
                  <TableCell className="w-10">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{event.title}</span>
                      {event.detail && (
                        <span className="text-sm text-muted-foreground">
                          {event.detail}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground tabular-nums">
                    {event.time}
                  </TableCell>
                  {event.value && (
                    <TableCell className="text-right text-sm font-medium tabular-nums">
                      {event.value}
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { ActivityLogCard }
