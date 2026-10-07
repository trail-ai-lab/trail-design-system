"use client"

import * as React from "react"
import { CheckIcon, PlusIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { InsightCallout } from "@/components/slai/insight-callout"
import {
  GroupCard,
  type RosterStudent,
  type SessionGroup,
} from "@/components/slai/group-card"
import { StudentChip } from "@/components/slai/student-chip"

export interface GroupPreset {
  id: string
  label: string
  icon?: React.ReactNode
  /** Explains how this preset groups students; shown under the bar */
  description?: string
  /** Produces the groups for this preset */
  build: () => SessionGroup[]
}

/**
 * Builder for a session's student groups. Start from an auto-group preset
 * (language, standards level, WIDA level...) or by hand: pick a student from
 * the unassigned pool, then click a group card to place them. Editing after
 * choosing a preset switches to "custom". Groups are controlled by the
 * parent via `groups` and `onGroupsChange`.
 */
function GroupBuilder({
  roster,
  groups,
  onGroupsChange,
  presets = [],
  className,
}: {
  roster: RosterStudent[]
  groups: SessionGroup[]
  onGroupsChange: (groups: SessionGroup[]) => void
  presets?: GroupPreset[]
  className?: string
}) {
  const [preset, setPreset] = React.useState<string>("custom")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const nextId = React.useRef(groups.length + 1)

  const assignedIds = new Set(groups.flatMap((g) => g.studentIds))
  const unassigned = roster.filter((s) => !assignedIds.has(s.id))
  const selected = roster.find((s) => s.id === selectedId)
  const activePreset = presets.find((p) => p.id === preset)

  const edit = (next: SessionGroup[]) => {
    setPreset("custom")
    onGroupsChange(next)
  }
  const update = (id: string, fn: (g: SessionGroup) => SessionGroup) =>
    edit(groups.map((g) => (g.id === id ? fn(g) : g)))
  const assign = (groupId: string, studentId: string) => {
    update(groupId, (g) => ({ ...g, studentIds: [...g.studentIds, studentId] }))
    setSelectedId(null)
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Auto-group by:</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={preset === "custom" ? "" : preset}
            onValueChange={(id) => {
              if (!id) return
              const found = presets.find((p) => p.id === id)
              if (!found) return
              setPreset(id)
              setSelectedId(null)
              onGroupsChange(found.build())
            }}
            aria-label="Auto-group by"
          >
            {presets.map((p) => (
              <ToggleGroupItem key={p.id} value={p.id}>
                {p.icon}
                {p.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
      {activePreset?.description && (
        <InsightCallout variant="info">{activePreset.description}</InsightCallout>
      )}

      {unassigned.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-status-paused/60 bg-status-paused/5 p-3">
          <p className="text-sm font-medium">Unassigned students</p>
          <div className="flex flex-wrap gap-1.5">
            {unassigned.map((student) => (
              <StudentChip
                key={student.id}
                name={student.name}
                language={student.language}
                grade={student.grade}
                wida={student.wida ?? undefined}
                native={student.wida === null}
                selected={student.id === selectedId}
                onClick={() =>
                  setSelectedId(student.id === selectedId ? null : student.id)
                }
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Click a student to select them, then click a group card to place them.
          </p>
        </div>
      )}

      {selected && (
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary">
          <CheckIcon className="size-4" />
          <span className="flex-1">
            {selected.name} selected — click any group card to place them.
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Clear selection"
            onClick={() => setSelectedId(null)}
          >
            <XIcon />
          </Button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            roster={roster}
            unassigned={unassigned}
            placing={selected?.name}
            onPlaceSelected={() => selected && assign(group.id, selected.id)}
            onAssign={(studentId) => assign(group.id, studentId)}
            onUnassign={(studentId) =>
              update(group.id, (g) => ({
                ...g,
                studentIds: g.studentIds.filter((id) => id !== studentId),
              }))
            }
            onRename={(name) => update(group.id, (g) => ({ ...g, name }))}
            onDelete={() => edit(groups.filter((g) => g.id !== group.id))}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            edit([
              ...groups,
              { id: `group-${nextId.current}`, name: `Group ${nextId.current++}`, studentIds: [] },
            ])
          }
          className="flex min-h-24 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-sm text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          <PlusIcon className="size-4" />
          Add group
        </button>
      </div>

      <p className="text-xs text-muted-foreground tabular-nums">
        {groups.length} groups · {roster.length - unassigned.length} of{" "}
        {roster.length} students assigned
        {unassigned.length > 0 && (
          <span className="text-status-paused"> · {unassigned.length} unassigned</span>
        )}
      </p>
    </div>
  )
}

export { GroupBuilder }
