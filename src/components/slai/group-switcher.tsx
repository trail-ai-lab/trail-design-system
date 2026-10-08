"use client"

import { LayersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  statusDotClassName,
  statusLabel,
  type SessionStatus,
} from "@/components/slai/session-status-badge"

/** Sentinel value for the combined "All groups" view. */
export const ALL_GROUPS = "all"

export interface SwitcherGroup {
  id: string
  name: string
  active?: boolean
  /** Audio state; colors the group's dot (red/amber/blue) */
  status?: SessionStatus
}

/**
 * One control to switch the whole workspace — transcript, summary, and
 * Q&A — between a single group and the combined "All groups" view. Groups
 * come first and the first group is selected by default; "All groups" is last.
 */
function GroupSwitcher({
  groups,
  value: valueProp,
  defaultValue,
  onValueChange,
  allLabel = "All groups",
  className,
}: {
  groups: SwitcherGroup[]
  /** Active group id, or `ALL_GROUPS` */
  value?: string
  /** Defaults to the first group (or `ALL_GROUPS` when there are none) */
  defaultValue?: string
  onValueChange?: (value: string) => void
  allLabel?: string
  className?: string
}) {
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? groups[0]?.id ?? ALL_GROUPS,
    onChange: onValueChange,
  })

  return (
    // A single-select toggle group (radio semantics): it switches what the whole
    // page shows rather than owning tab panels of its own.
    <ToggleGroup
      type="single"
      value={value}
      // Clicking the active item would clear the value; a scope is always set.
      onValueChange={(next) => next && setValue(next)}
      aria-label="Group"
      spacing={1}
      data-slot="group-switcher"
      className={cn("h-8 rounded-2xl bg-muted p-[3px]", className)}
    >
      {groups.map((group) => (
        <ToggleGroupItem
          key={group.id}
          value={group.id}
          title={group.status ? statusLabel(group.status) : undefined}
          className={itemClassName}
        >
          <span
            aria-hidden
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
          {group.status && (
            <span className="sr-only">, {statusLabel(group.status)}</span>
          )}
        </ToggleGroupItem>
      ))}
      <ToggleGroupItem value={ALL_GROUPS} className={itemClassName}>
        <LayersIcon className="size-3.5" />
        {allLabel}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

/** Matches the TabsList look: muted track, the selected item raised. */
const itemClassName =
  "h-full gap-1.5 rounded-2xl px-2 text-foreground/60 hover:bg-transparent hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-raised dark:text-muted-foreground dark:data-[state=on]:bg-input/30"

export { GroupSwitcher }
