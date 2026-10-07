"use client"

import { LayersIcon, UsersIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type InsightScope = "group" | "all"

/**
 * Segmented switch between the active group and all groups, used by the
 * live insights (summary and Q&A) to pick what they analyze.
 */
function ScopeToggle({
  value,
  onValueChange,
  groupLabel = "This group",
  allLabel = "All groups",
  className,
}: {
  value: InsightScope
  onValueChange?: (value: InsightScope) => void
  groupLabel?: string
  allLabel?: string
  className?: string
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={(next) => next && onValueChange?.(next as InsightScope)}
      aria-label="Insight scope"
      className={className}
    >
      <ToggleGroupItem value="group">
        <UsersIcon />
        {groupLabel}
      </ToggleGroupItem>
      <ToggleGroupItem value="all">
        <LayersIcon />
        {allLabel}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export { ScopeToggle }
