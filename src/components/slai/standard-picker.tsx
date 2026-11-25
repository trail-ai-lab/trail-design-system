"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, TargetIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/** One standard, or one lettered part of it, that a session can work on */
export interface StandardOption {
  /** e.g. "7.RP.2" or "7.RP.2a" */
  code: string
  grade: number
  /** e.g. "Ratios and Proportional Relationships" */
  domain: string
  /** e.g. "RP" */
  domainCode: string
  text: string
  /** "a", "b"… for a lettered part, shown indented under its standard */
  part?: string | null
}

/**
 * Searchable single-select of content standards (e.g. Common Core math),
 * grouped by domain. With more than one grade, a grade switch picks the
 * grade listed; typing searches every grade, by code or words. `noneLabel`
 * adds a first option that clears the value.
 */
function StandardPicker({
  standards,
  value,
  onValueChange,
  defaultGrade,
  onGradeChange,
  placeholder = "Choose a standard…",
  noneLabel,
  disabled = false,
  loading = false,
  id,
  "aria-label": ariaLabel,
  className,
}: {
  standards: StandardOption[]
  value?: string | null
  onValueChange?: (code: string | null) => void
  /** The grade listed when nothing is chosen, e.g. the last one used; else the first grade */
  defaultGrade?: number
  /** A grade was switched to, or a standard of that grade chosen */
  onGradeChange?: (grade: number) => void
  placeholder?: string
  noneLabel?: string
  disabled?: boolean
  /** The standards are loading; disables the trigger */
  loading?: boolean
  id?: string
  "aria-label"?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [pickedGrade, setPickedGrade] = React.useState<number>()
  const chosen = standards.find((s) => s.code === value)
  const grades = React.useMemo(
    () => [...new Set(standards.map((s) => s.grade))],
    [standards]
  )
  // The grade listed: the one switched to, else the chosen standard's, else
  // the default
  const grade =
    pickedGrade ??
    chosen?.grade ??
    (defaultGrade !== undefined && grades.includes(defaultGrade)
      ? defaultGrade
      : grades[0])
  const searching = search.trim() !== ""
  const domains = React.useMemo(() => {
    const out = new Map<string, StandardOption[]>()
    for (const s of standards) {
      if (!searching && s.grade !== grade) continue
      const key = `${s.domain} (${s.grade}.${s.domainCode})`
      out.set(key, [...(out.get(key) ?? []), s])
    }
    return [...out]
  }, [standards, searching, grade])

  // Each opening starts on the value's grade with an empty search
  const changeOpen = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setSearch("")
      setPickedGrade(undefined)
    }
  }

  const choose = (code: string | null) => {
    const picked = standards.find((s) => s.code === code)
    if (picked) onGradeChange?.(picked.grade)
    onValueChange?.(code)
    changeOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <PopoverTrigger asChild>
        <Button
          data-slot="standard-picker"
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          disabled={disabled || loading}
          className={cn(
            "h-auto min-h-9 w-full justify-between py-2 font-normal",
            className
          )}
        >
          <span
            className={cn(
              "flex min-w-0 items-start gap-2 text-left",
              !chosen && "text-muted-foreground"
            )}
          >
            <TargetIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            {chosen ? (
              <span className="min-w-0 whitespace-normal">
                <span className="block font-medium">{chosen.code}</span>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {chosen.text}
                </span>
              </span>
            ) : (
              <span className="truncate">
                {loading
                  ? "Loading standards…"
                  : noneLabel && value === null
                    ? noneLabel
                    : placeholder}
              </span>
            )}
          </span>
          <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label="Standards"
        align="start"
        className="w-(--radix-popover-trigger-width) min-w-80 p-0"
      >
        <Command filter={matchesEveryWord}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={
              grades.length > 1
                ? "Search every grade by code or words"
                : "Search by code or words"
            }
          />
          {grades.length > 1 && (
            <div className="flex items-center gap-2 border-b px-3 py-2">
              <span className="text-xs text-muted-foreground">Grade</span>
              <ToggleGroup
                type="single"
                size="sm"
                variant="outline"
                value={searching ? "" : String(grade)}
                onValueChange={(next) => {
                  if (!next) return
                  setPickedGrade(Number(next))
                  onGradeChange?.(Number(next))
                  setSearch("")
                }}
                aria-label="Grade"
              >
                {grades.map((g) => (
                  <ToggleGroupItem
                    key={g}
                    value={String(g)}
                    className="px-3 tabular-nums"
                  >
                    {g}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
          <CommandList className="max-h-80">
            <CommandEmpty>No standard found.</CommandEmpty>
            {noneLabel && (
              <CommandGroup>
                <CommandItem value={noneLabel} onSelect={() => choose(null)}>
                  {noneLabel}
                  {!value && <CheckIcon className="ml-auto" />}
                </CommandItem>
              </CommandGroup>
            )}
            {domains.map(([domain, items]) => (
              <CommandGroup key={domain} heading={domain}>
                {items.map((s) => (
                  <CommandItem
                    key={s.code}
                    value={`${s.code} ${s.text}`}
                    onSelect={() => choose(s.code)}
                    className={cn("items-start", s.part && "pl-6")}
                  >
                    <span className="w-16 shrink-0 font-medium tabular-nums">
                      {s.code}
                    </span>
                    <span className="line-clamp-2 text-xs text-muted-foreground">
                      {s.text}
                    </span>
                    {value === s.code && (
                      <CheckIcon className="ml-auto shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Keeps the list's order: an item matches when it contains every word typed
 * (code or text), and all matches score the same so none jump ahead.
 */
function matchesEveryWord(value: string, search: string) {
  const haystack = value.toLowerCase()
  return search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
    ? 1
    : 0
}

export { StandardPicker }
