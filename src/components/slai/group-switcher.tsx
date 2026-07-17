"use client"

import { LayersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  statusDotClassName,
  type SessionStatus,
} from "@/components/slai/session-status-badge"

/** Sentinel value for the combined "All groups" view. */
export const ALL_GROUPS = "all"

export interface SwitcherGroup {
  id: string
  name: string
  memberCount: number
  active?: boolean
  /** Audio state; colors the group's dot (red/amber/blue) */
  status?: SessionStatus
}

/**
 * One control to switch the whole workspace — transcript, summary, and
 * Q&A — between a single group and the combined "All groups" view.
 */
function GroupSwitcher({
  groups,
  value,
  onValueChange,
  allLabel = "All groups",
  className,
}: {
  groups: SwitcherGroup[]
  /** Active group id, or `ALL_GROUPS` */
  value?: string
  onValueChange?: (value: string) => void
  allLabel?: string
  className?: string
}) {
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      defaultValue={ALL_GROUPS}
      className={className}
    >
      <TabsList>
        <TabsTrigger value={ALL_GROUPS}>
          <LayersIcon className="size-3.5" />
          {allLabel}
        </TabsTrigger>
        {groups.map((group) => (
          <TabsTrigger key={group.id} value={group.id}>
            <span
              className={cn(
                "size-1.5 rounded-full",
                group.status
                  ? statusDotClassName(group.status)
                  : group.active
                    ? "bg-primary"
                    : "bg-muted-foreground/40"
              )}
            />
            {group.name}
            <Badge variant="secondary" className="px-1.5">
              {group.memberCount}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { GroupSwitcher }
