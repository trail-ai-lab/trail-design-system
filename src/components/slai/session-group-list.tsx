"use client"

import { ArrowRightIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SessionStatusBadge, type SessionStatus } from "@/components/slai/session-status-badge"

export interface SessionGroupListItem {
  id: string
  name: string
  students: string[]
  status?: SessionStatus
}

/**
 * Navigation list of the groups in a session, used on the session overview
 * to drill into one group's recording. Each row shows the group name, a
 * student count and the student names.
 */
function SessionGroupList({
  groups,
  activeId,
  onSelect,
  className,
}: {
  groups: SessionGroupListItem[]
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {groups.map((group) => (
        <li key={group.id}>
          <button
            type="button"
            aria-current={group.id === activeId || undefined}
            onClick={() => onSelect?.(group.id)}
            className="group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 aria-[current]:bg-muted"
          >
            <UsersIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">
                  {group.name}
                </span>
                <Badge variant="secondary" className="px-1.5 tabular-nums">
                  {group.students.length}
                </Badge>
                {group.status && <SessionStatusBadge status={group.status} />}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {group.students.length > 0
                  ? group.students.join(", ")
                  : "No student names provided"}
              </span>
            </span>
            <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/row:opacity-100 group-focus-visible/row:opacity-100" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export { SessionGroupList }
