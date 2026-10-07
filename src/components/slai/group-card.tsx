"use client"

import * as React from "react"
import { CheckIcon, PencilIcon, PlusIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { StudentChip } from "@/components/slai/student-chip"

export interface RosterStudent {
  id: string
  name: string
  /** Language code, e.g. "ES" */
  language: string
  grade: number
  /** Null for native English speakers */
  wida: number | null
}

export interface SessionGroup {
  id: string
  name: string
  studentIds: string[]
}

/**
 * One group on the session setup board: an editable name, its students as
 * removable chips, auto-derived language and grade tags, and an "Add" menu
 * of unassigned students. While a student is selected elsewhere
 * (`placing`), the whole card becomes a click target to place them.
 */
function GroupCard({
  group,
  roster,
  unassigned,
  placing,
  onAssign,
  onUnassign,
  onRename,
  onDelete,
  onPlaceSelected,
  className,
}: {
  group: SessionGroup
  roster: RosterStudent[]
  /** Students not in any group, offered in the Add menu */
  unassigned: RosterStudent[]
  /** Name of the student currently selected for placement, if any */
  placing?: string
  onAssign?: (studentId: string) => void
  onUnassign?: (studentId: string) => void
  onRename?: (name: string) => void
  onDelete?: () => void
  /** Called when the card is clicked while `placing` */
  onPlaceSelected?: () => void
  className?: string
}) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(group.name)
  const members = group.studentIds
    .map((id) => roster.find((s) => s.id === id))
    .filter((s): s is RosterStudent => Boolean(s))
  const languages = [...new Set(members.map((s) => s.language))]
  const grades = [...new Set(members.map((s) => s.grade))].sort()

  const commit = () => {
    const name = draft.trim()
    if (name) onRename?.(name)
    else setDraft(group.name)
    setEditing(false)
  }

  return (
    <div
      role={placing ? "button" : undefined}
      tabIndex={placing ? 0 : undefined}
      onClick={placing ? onPlaceSelected : undefined}
      onKeyDown={(event) => {
        if (placing && event.key === "Enter") onPlaceSelected?.()
      }}
      data-placing={placing ? true : undefined}
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 transition-colors",
        "data-[placing]:cursor-pointer data-[placing]:border-primary data-[placing]:bg-primary/5",
        className
      )}
    >
      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        {editing ? (
          <>
            <Input
              autoFocus
              aria-label="Group name"
              className="h-8"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") commit()
                if (event.key === "Escape") {
                  setDraft(group.name)
                  setEditing(false)
                }
              }}
            />
            <Button variant="ghost" size="icon-sm" aria-label="Save name" onClick={commit}>
              <CheckIcon />
            </Button>
          </>
        ) : (
          <>
            <h4 className="truncate text-sm font-semibold">{group.name}</h4>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Rename group"
              onClick={() => setEditing(true)}
            >
              <PencilIcon />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${group.name}`}
          className="ml-auto text-muted-foreground hover:text-destructive"
          onClick={onDelete}
        >
          <XIcon />
        </Button>
      </div>

      <div className="flex min-h-8 flex-wrap gap-1.5">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Empty — add students below
          </p>
        ) : (
          members.map((student) => (
            <StudentChip
              key={student.id}
              name={student.name}
              language={student.language}
              grade={student.grade}
              wida={student.wida ?? undefined}
              native={student.wida === null}
              onRemove={() => onUnassign?.(student.id)}
            />
          ))
        )}
      </div>

      <div
        className="flex flex-wrap items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {languages.map((code) => (
          <Badge key={code} variant="secondary">
            {code}
          </Badge>
        ))}
        {grades.map((grade) => (
          <Badge key={grade} variant="outline">
            Gr {grade}
          </Badge>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              disabled={unassigned.length === 0}
              className="border-dashed"
            >
              <PlusIcon data-icon="inline-start" />
              Add
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {unassigned.map((student) => (
              <DropdownMenuItem key={student.id} onSelect={() => onAssign?.(student.id)}>
                {student.name}
                <span className="ml-auto text-xs text-muted-foreground">
                  {student.language}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {placing && (
        <p className="absolute inset-x-0 bottom-1 text-center text-xs text-primary">
          Click to add {placing} here
        </p>
      )}
    </div>
  )
}

export { GroupCard }
