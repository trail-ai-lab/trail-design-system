"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Assigns a diarized "Speaker N" to a student. The list is searchable, offers
 * an "Unassigned" option, and (with `onAddStudent`) lets the teacher add a
 * student by typing a name that is not in the roster yet.
 */
function SpeakerAssignDropdown({
  students,
  value,
  onValueChange,
  onAddStudent,
  placeholder = "Unassigned",
  disabled = false,
  "aria-label": ariaLabel,
  className,
}: {
  students: string[]
  /** Assigned student name, or undefined when unassigned */
  value?: string
  onValueChange: (value: string | undefined) => void
  /** Called with the typed name when "Add student" is chosen */
  onAddStudent?: (name: string) => void
  placeholder?: string
  disabled?: boolean
  /** Accessible name when there's no visible <label htmlFor={id}> */
  "aria-label"?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const trimmed = search.trim()
  const canAdd =
    Boolean(onAddStudent) &&
    trimmed.length > 0 &&
    !students.some((s) => s.toLowerCase() === trimmed.toLowerCase())

  const choose = (next: string | undefined) => {
    onValueChange(next)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setSearch("")
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-40 justify-between font-normal", className)}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ?? placeholder}
          </span>
          <ChevronsUpDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <Command>
          <CommandInput
            placeholder="Search or add student…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {onAddStudent
                ? "Type a name to add a student."
                : "No student found."}
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="__unassigned__"
                onSelect={() => choose(undefined)}
              >
                <span className="text-muted-foreground">Unassigned</span>
                {!value && <CheckIcon className="ml-auto" />}
              </CommandItem>
              {students.map((student) => (
                <CommandItem
                  key={student}
                  value={student}
                  onSelect={() => choose(student)}
                >
                  {student}
                  {value === student && <CheckIcon className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
            {canAdd && (
              <>
                <CommandSeparator />
                <CommandGroup forceMount>
                  <CommandItem
                    value={`__add__${trimmed}`}
                    forceMount
                    onSelect={() => {
                      onAddStudent?.(trimmed)
                      choose(trimmed)
                    }}
                  >
                    <PlusIcon />
                    Add &ldquo;{trimmed}&rdquo;
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { SpeakerAssignDropdown }
