"use client"

import * as React from "react"
import { ChevronDownIcon, ListIcon, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { IconTile } from "@/components/patterns/icon-tile"

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
  /** Expandable specifics, e.g. every setting and result of a run */
  details?: { label: string; value: string }[]
}

/**
 * Log of what happened in the session's activity — which trails were run
 * and which simulation values students changed, in order. Events with
 * `details` expand to show them.
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
  const uid = React.useId()
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const anyDetails = events.some((event) => event.details?.length)

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
        {events.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListIcon />
              </EmptyMedia>
              <EmptyTitle>No activity yet</EmptyTitle>
              <EmptyDescription>
                Activity runs and simulation changes will appear here as{" "}
                {scopeLabel ?? "the group"} works.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableBody>
              {events.map((event) => {
                const Icon = event.icon
                const isExpanded = expanded.has(event.id)
                const hasDetails = !!event.details?.length
                return (
                  <React.Fragment key={event.id}>
                    <TableRow>
                      <TableCell className="w-10">
                        <IconTile>
                          <Icon className="text-muted-foreground" />
                        </IconTile>
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
                      {anyDetails && (
                        <TableCell className="w-10 text-right">
                          {hasDetails && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-expanded={isExpanded}
                              aria-controls={`${uid}-${event.id}`}
                              aria-label={`${isExpanded ? "Hide" : "Show"} details for ${event.title}`}
                              onClick={() => toggle(event.id)}
                            >
                              <ChevronDownIcon
                                className={cn(
                                  "transition-transform duration-fast",
                                  isExpanded && "rotate-180"
                                )}
                              />
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                    {hasDetails && isExpanded && (
                      <TableRow
                        id={`${uid}-${event.id}`}
                        className="hover:bg-transparent"
                      >
                        <TableCell />
                        <TableCell colSpan={4} className="pt-0">
                          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                            {event.details!.map((row) => (
                              <React.Fragment key={row.label}>
                                <dt className="text-muted-foreground">
                                  {row.label}
                                </dt>
                                <dd className="tabular-nums">{row.value}</dd>
                              </React.Fragment>
                            ))}
                          </dl>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export { ActivityLogCard }
