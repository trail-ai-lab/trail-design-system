"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  ClockIcon,
  LanguagesIcon,
  QrCodeIcon,
  UsersIcon,
} from "lucide-react"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ALL_GROUPS } from "@/components/slai/group-switcher"
import {
  SessionStatusBadge,
  type SessionStatus,
} from "@/components/slai/session-status-badge"

export interface TranscriptEntry {
  id: string
  /** Formatted time of the utterance, e.g. "3:42 PM" */
  timestamp?: string
  /** Detected language of the utterance, e.g. "Marathi" — the speaker is unknown */
  language: string
  original: string
  /** Rendered stacked below the original; hidden when identical to it */
  translation?: string
}

export interface TranscriptGroup {
  id: string
  name: string
  memberCount: number
  active?: boolean
  /** Audio state for this group; colors its dot in the group switcher */
  status?: SessionStatus
  /** Formatted start time, e.g. "3:38 PM" */
  startedAt?: string
  students?: string[]
  entries: TranscriptEntry[]
}

/** Parse a "3:41 PM" display time into minutes for chronological merging. */
function toMinutes(time?: string) {
  if (!time) return 0
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let hours = parseInt(match[1], 10) % 12
  if (/pm/i.test(match[3])) hours += 12
  return hours * 60 + parseInt(match[2], 10)
}

function TranscriptRow({
  entry,
  groupName,
  translationLanguage,
}: {
  entry: TranscriptEntry
  /** Set in the combined view to show which group the line came from */
  groupName?: string
  translationLanguage?: string
}) {
  const showTranslation =
    Boolean(entry.translation) && entry.translation !== entry.original

  return (
    <div className="flex gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
        <AudioLinesIcon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          {groupName && (
            <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
              {groupName}
            </Badge>
          )}
          <span className="font-medium text-foreground">{entry.language}</span>
          {entry.timestamp && (
            <>
              <span aria-hidden>·</span>
              <span className="tabular-nums">{entry.timestamp}</span>
            </>
          )}
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          {entry.original}
        </p>
        {showTranslation && (
          <p className="flex items-start gap-1.5 text-sm leading-relaxed text-muted-foreground">
            <LanguagesIcon className="mt-1 size-3 shrink-0" />
            {entry.translation}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * Hero card for the live session. Shows the active group's transcript — or
 * every group's, interleaved and badged — with translations stacked below
 * each utterance. The speaker is not identified; the detected language leads.
 */
function TranscriptCard({
  groups,
  scope = ALL_GROUPS,
  status = "recording",
  translationLanguage,
  allLabel = "All groups",
  autoScroll = true,
  className,
}: {
  groups: TranscriptGroup[]
  /** Active group id, or `ALL_GROUPS` for the combined view */
  scope?: string
  status?: SessionStatus
  /** Language translations are rendered in, e.g. "English" */
  translationLanguage?: string
  /** Label for the combined view, shown in the scope badge */
  allLabel?: string
  /** Keep the newest entries in view as they arrive */
  autoScroll?: boolean
  className?: string
}) {
  const isAll = scope === ALL_GROUPS
  const activeGroup = groups.find((group) => group.id === scope)
  const scopeLabel = isAll ? allLabel : activeGroup?.name
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const rows = React.useMemo(() => {
    if (isAll) {
      return groups
        .flatMap((group) =>
          group.entries.map((entry) => ({ entry, group }))
        )
        .sort(
          (a, b) => toMinutes(a.entry.timestamp) - toMinutes(b.entry.timestamp)
        )
    }
    return (activeGroup?.entries ?? []).map((entry) => ({
      entry,
      group: activeGroup,
    }))
  }, [isAll, groups, activeGroup])

  React.useEffect(() => {
    if (!autoScroll) return
    const viewport = scrollRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    viewport?.scrollTo({ top: viewport.scrollHeight })
  }, [autoScroll, scope, rows.length])

  return (
    <Card className={cn("flex min-h-0 flex-col", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2.5">
          Live transcript
          <SessionStatusBadge status={status} />
        </CardTitle>
        <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {isAll ? (
            <span className="flex items-center gap-1">
              <UsersIcon className="size-3.5" />
              {groups.length} groups · {groups.reduce(
                (total, group) => total + group.memberCount,
                0
              )}{" "}
              students
            </span>
          ) : (
            <>
              {activeGroup?.startedAt && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  Started {activeGroup.startedAt}
                </span>
              )}
              <span className="flex items-center gap-1">
                <UsersIcon className="size-3.5" />
                {activeGroup?.students?.length
                  ? activeGroup.students.join(", ")
                  : `${activeGroup?.memberCount ?? 0} students`}
              </span>
            </>
          )}
        </div>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea ref={scrollRef} className="min-h-0 flex-1">
          {rows.length === 0 ? (
            <div className="flex h-full items-center justify-center px-(--card-spacing) py-10">
              <p className="text-sm text-muted-foreground">
                Waiting for students to speak...
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 px-(--card-spacing) py-1">
              {rows.map(({ entry, group }) => (
                <TranscriptRow
                  key={`${group?.id}-${entry.id}`}
                  entry={entry}
                  groupName={isAll ? group?.name : undefined}
                  translationLanguage={translationLanguage}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="px-(--card-spacing)">
          <Separator className="-mx-2 mt-1 w-auto!" />
          <p className="pt-3 text-center text-xs text-muted-foreground/70">
            SLAI can make mistakes. Double-check important responses.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Shown when a session is running but no student groups have joined yet.
 */
function GroupsEmptyState({
  onShowInvite,
  className,
}: {
  onShowInvite?: () => void
  className?: string
}) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersIcon />
        </EmptyMedia>
        <EmptyTitle>No groups yet</EmptyTitle>
        <EmptyDescription>
          Share the invite link or QR code and groups will appear here once
          students join.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onShowInvite}>
        <QrCodeIcon data-icon="inline-start" />
        Show invite
      </Button>
    </Empty>
  )
}

export { TranscriptCard, GroupsEmptyState }
