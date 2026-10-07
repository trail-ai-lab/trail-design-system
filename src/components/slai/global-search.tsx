"use client"

import * as React from "react"
import { MicIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export interface SearchResult {
  id: string
  className: string
  sessionName: string
  groupName?: string
  speaker?: string
  /** Matching transcript excerpt */
  snippet: string
  timestamp?: string
}

const ALL = "__all__"

/**
 * Cmd+K dialog that searches transcripts across classes and sessions.
 * Fully controlled and presentational: the app owns the query, debounce and
 * result fetching and passes back `results`, `loading` and `error`. Results
 * are grouped under "Class › Session" headings. The class filter appears
 * first; the session filter once a class is chosen.
 */
function GlobalSearch({
  open,
  onOpenChange,
  query,
  onQueryChange,
  results,
  loading = false,
  error,
  classes = [],
  sessions = [],
  classFilter,
  sessionFilter,
  onClassFilterChange,
  onSessionFilterChange,
  onSelectResult,
  minQueryLength = 2,
  tookMs,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (query: string) => void
  results: SearchResult[]
  loading?: boolean
  error?: string
  /** Options for the class filter */
  classes?: string[]
  /** Options for the session filter, scoped to the selected class */
  sessions?: string[]
  classFilter?: string
  sessionFilter?: string
  /** `undefined` means "All classes" */
  onClassFilterChange?: (value: string | undefined) => void
  /** `undefined` means "All sessions" */
  onSessionFilterChange?: (value: string | undefined) => void
  onSelectResult?: (result: SearchResult) => void
  /** Queries shorter than this show the "start typing" prompt */
  minQueryLength?: number
  /** Server query time, shown with the result count */
  tookMs?: number
}) {
  const grouped = React.useMemo(() => {
    const map = new Map<string, SearchResult[]>()
    for (const result of results) {
      const key = `${result.className} › ${result.sessionName}`
      map.set(key, [...(map.get(key) ?? []), result])
    }
    return [...map.entries()]
  }, [results])

  const tooShort = query.trim().length < minQueryLength

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search recordings"
      description="Search transcripts across classes and sessions"
      className="sm:max-w-2xl"
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search transcripts..."
          value={query}
          onValueChange={onQueryChange}
        />
        {classes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
            <Select
              value={classFilter ?? ALL}
              onValueChange={(v) => onClassFilterChange?.(v === ALL ? undefined : v)}
            >
              <SelectTrigger size="sm" aria-label="Class filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All classes</SelectItem>
                {classes.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {classFilter && (
              <Select
                value={sessionFilter ?? ALL}
                onValueChange={(v) =>
                  onSessionFilterChange?.(v === ALL ? undefined : v)
                }
              >
                <SelectTrigger size="sm" aria-label="Session filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All sessions</SelectItem>
                  {sessions.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {!tooShort && !loading && !error && (
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {results.length} {results.length === 1 ? "result" : "results"}
                {tookMs !== undefined && ` · ${tookMs} ms`}
              </span>
            )}
          </div>
        )}
        <CommandList className="max-h-[420px]">
          {tooShort ? (
            <p className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <SearchIcon className="size-4" />
              Start typing to search recordings
            </p>
          ) : loading ? (
            <div className="flex flex-col gap-3 p-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="py-10 text-center text-sm text-destructive">{error}</p>
          ) : results.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No recordings found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            grouped.map(([heading, items]) => (
              <CommandGroup key={heading} heading={heading}>
                {items.map((result) => (
                  <CommandItem
                    key={result.id}
                    value={result.id}
                    onSelect={() => onSelectResult?.(result)}
                    className="items-start gap-3"
                  >
                    <MicIcon className="mt-0.5 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                        {result.speaker && (
                          <Badge variant="secondary">{result.speaker}</Badge>
                        )}
                        {result.groupName && <span>{result.groupName}</span>}
                        {result.timestamp && (
                          <span className="tabular-nums">{result.timestamp}</span>
                        )}
                      </span>
                      <span className="line-clamp-2 text-sm text-foreground">
                        {result.snippet}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

/**
 * Registers the global Cmd/Ctrl+K shortcut. Call `onToggle` from your own
 * open state: `useSearchShortcut(() => setOpen((o) => !o))`.
 */
function useSearchShortcut(onToggle: () => void) {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onToggle()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onToggle])
}

export { GlobalSearch, useSearchShortcut }
