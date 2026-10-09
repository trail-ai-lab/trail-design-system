"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  CaptionsOffIcon,
  ClockIcon,
  LanguagesIcon,
  QrCodeIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ALL_GROUPS } from "@/components/slai/group-switcher"
import { NoisyAudioBanner } from "@/components/slai/noisy-audio-banner"
import { RecordingTimer } from "@/components/slai/recording-timer"
import {
  SessionStatusBadge,
  type SessionStatus,
} from "@/components/slai/session-status-badge"
import { TranscriptUtteranceRow } from "@/components/slai/transcript-utterance-row"

export interface TranscriptEntry {
  id: string
  /** Formatted time of the utterance, e.g. "3:42 PM" */
  timestamp?: string
  /** Exact time (epoch ms or ISO string). Orders lines across groups and
   * places the check-in divider; without it lines are ordered by
   * `timestamp`, to the minute. */
  at?: number | string
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
  /** Seconds this group has been recording, pauses excluded, from your own
   * clock. Shown after the status badge while this group is in scope. */
  recordedSeconds?: number
  students?: string[]
  /** The group's audio was flagged as too noisy for reliable transcription */
  noisyAudio?: boolean
  entries: TranscriptEntry[]
}

function toTime(at: number | string) {
  return typeof at === "number" ? at : Date.parse(at)
}

/** Chronological order: exact times when both lines have one, else minutes. */
function compareEntries(a: TranscriptEntry, b: TranscriptEntry) {
  if (a.at !== undefined && b.at !== undefined) {
    return toTime(a.at) - toTime(b.at)
  }
  return toMinutes(a.timestamp) - toMinutes(b.timestamp)
}

function CheckInDivider({ label }: { label: string }) {
  return (
    <div
      role="separator"
      aria-label={`Checked in at ${label}`}
      className="flex items-center gap-2 text-xs text-muted-foreground"
    >
      <span aria-hidden className="flex-1 border-t border-dashed" />
      Checked in · {label}
      <span aria-hidden className="flex-1 border-t border-dashed" />
    </div>
  )
}

/** "Group 1", "Group 1 and Group 2", "Group 1, Group 2 and Group 3". */
function joinNames(names: string[]) {
  return names.length <= 1
    ? (names[0] ?? "")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
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
  highlighted,
}: {
  entry: TranscriptEntry
  /** Set in the combined view to show which group the line came from */
  groupName?: string
  highlighted?: boolean
}) {
  return (
    <TranscriptUtteranceRow
      highlighted={highlighted}
      leading={
        <Avatar size="sm" className="mt-0.5" aria-hidden>
          <AvatarFallback>
            <AudioLinesIcon className="size-3" />
          </AvatarFallback>
        </Avatar>
      }
      meta={
        groupName && (
          <Badge variant="outline" className="h-4 px-1.5 text-xs">
            {groupName}
          </Badge>
        )
      }
      entry={entry}
    />
  )
}

/**
 * Hero card for the live session. Shows the active group's transcript — or
 * every group's, interleaved in time order and badged — with translations
 * stacked below each utterance. The speaker is not identified; the detected
 * language leads. Also used after a session (with `title="Transcript"`) to
 * show the raw, speaker-unknown transcript alongside the diarized one.
 *
 * A single group's `recordedSeconds` shows as a timer after the status badge.
 * Groups flagged `noisyAudio` get a warning above the lines; `checkIn` marks
 * where the latest check-in happened; `interimText` shows words still being
 * recognized; `transcriptionEnabled={false}` explains that live
 * transcription is off.
 */
function TranscriptCard({
  title = "Live transcript",
  groups,
  scope = ALL_GROUPS,
  status = "recording",
  translationLanguage,
  allLabel = "All groups",
  autoScroll = true,
  highlightedEntryId,
  checkIn,
  interimText,
  transcriptionEnabled = true,
  onOpenLanguageSettings,
  action,
  className,
}: {
  title?: React.ReactNode
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
  /** Entry to emphasize, e.g. the sentence a chat answer cites */
  highlightedEntryId?: string
  /** The latest check-in: a divider marks where it falls among the lines
   * (needs `at` on entries). `label` is the formatted time, e.g. "3:42 PM". */
  checkIn?: { at: number | string; label: string }
  /** Words still being recognized, shown muted after the last line */
  interimText?: string
  /** Live transcription is on for the session; when off, the card says so */
  transcriptionEnabled?: boolean
  /** Adds a "Language settings" button to the transcription-off state */
  onOpenLanguageSettings?: () => void
  /** Header action beside the scope badge, e.g. a "Retranscribe…" button */
  action?: React.ReactNode
  className?: string
}) {
  const isAll = scope === ALL_GROUPS
  const activeGroup = groups.find((group) => group.id === scope)
  const scopeLabel = isAll ? allLabel : activeGroup?.name
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const rows = React.useMemo(() => {
    if (isAll) {
      return groups
        .flatMap((group) => group.entries.map((entry) => ({ entry, group })))
        .sort((a, b) => compareEntries(a.entry, b.entry))
    }
    return (activeGroup?.entries ?? []).map((entry) => ({
      entry,
      group: activeGroup,
    }))
  }, [isAll, groups, activeGroup])

  // The divider goes before the first line after the check-in, or after the
  // last line when nothing has been said since.
  const checkInIndex = React.useMemo(() => {
    if (!checkIn || rows.length === 0) return -1
    if (!rows.every(({ entry }) => entry.at !== undefined)) return -1
    const time = toTime(checkIn.at)
    const index = rows.findIndex(({ entry }) => toTime(entry.at!) > time)
    return index === -1 ? rows.length : index
  }, [checkIn, rows])

  const noisyGroups = (isAll ? groups : activeGroup ? [activeGroup] : [])
    .filter((group) => group.noisyAudio)
    .map((group) => group.name)

  React.useEffect(() => {
    if (!autoScroll) return
    const viewport = scrollRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    viewport?.scrollTo({ top: viewport.scrollHeight })
  }, [autoScroll, scope, rows.length, interimText])

  return (
    <Card className={cn("flex min-h-0 flex-col", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2.5">
          {title}
          <SessionStatusBadge status={status} />
          {!isAll && activeGroup?.recordedSeconds !== undefined && (
            <RecordingTimer
              seconds={activeGroup.recordedSeconds}
              compact
              className="text-sm text-muted-foreground"
            />
          )}
        </CardTitle>
        <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {isAll ? (
            <span className="flex items-center gap-1">
              <UsersIcon className="size-3.5" />
              {groups.length} groups ·{" "}
              {groups.reduce((total, group) => total + group.memberCount, 0)}{" "}
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
              {(activeGroup?.students?.length ||
                (activeGroup?.memberCount ?? 0) > 0) && (
                <span className="flex items-center gap-1">
                  <UsersIcon className="size-3.5" />
                  {activeGroup?.students?.length
                    ? activeGroup.students.join(", ")
                    : `${activeGroup?.memberCount} students`}
                </span>
              )}
            </>
          )}
          {translationLanguage && (
            <span className="flex items-center gap-1">
              <LanguagesIcon className="size-3.5" />
              Translated to {translationLanguage}
            </span>
          )}
        </div>
        {(scopeLabel || action) && (
          <CardAction className="flex items-center gap-2">
            {action}
            {scopeLabel && <Badge variant="secondary">{scopeLabel}</Badge>}
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        {transcriptionEnabled && noisyGroups.length > 0 && (
          <div className="px-(--card-spacing) pb-3">
            <NoisyAudioBanner
              title={
                isAll
                  ? `Audio may be too noisy in ${joinNames(noisyGroups)}`
                  : undefined
              }
            />
          </div>
        )}
        <ScrollArea ref={scrollRef} className="min-h-0 flex-1">
          {!transcriptionEnabled ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CaptionsOffIcon />
                </EmptyMedia>
                <EmptyTitle>Live transcription is off</EmptyTitle>
                <EmptyDescription>
                  Turn it on in language settings to see what groups say.
                </EmptyDescription>
              </EmptyHeader>
              {onOpenLanguageSettings && (
                <EmptyContent>
                  <Button variant="outline" onClick={onOpenLanguageSettings}>
                    <LanguagesIcon data-icon="inline-start" />
                    Language settings
                  </Button>
                </EmptyContent>
              )}
            </Empty>
          ) : rows.length === 0 && !interimText ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <AudioLinesIcon />
                </EmptyMedia>
                <EmptyTitle>Waiting for students to speak</EmptyTitle>
                <EmptyDescription>
                  Lines appear here as each group talks.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div
              role="log"
              aria-live="polite"
              aria-label="Transcript"
              className="flex flex-col gap-5 px-(--card-spacing) py-1"
            >
              {rows.map(({ entry, group }, index) => (
                <React.Fragment key={`${group?.id}-${entry.id}`}>
                  {index === checkInIndex && checkIn && (
                    <CheckInDivider label={checkIn.label} />
                  )}
                  <TranscriptRow
                    entry={entry}
                    groupName={isAll ? group?.name : undefined}
                    highlighted={entry.id === highlightedEntryId}
                  />
                </React.Fragment>
              ))}
              {checkInIndex === rows.length && checkIn && (
                <CheckInDivider label={checkIn.label} />
              )}
              {interimText && (
                <p
                  data-slot="transcript-interim"
                  className="pl-9 text-sm text-muted-foreground italic"
                >
                  {interimText}
                </p>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="px-(--card-spacing)">
          <Separator className="-mx-2 mt-1 w-auto!" />
          <p className="pt-3 text-center text-xs text-muted-foreground">
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
      <EmptyContent>
        <Button variant="outline" onClick={onShowInvite}>
          <QrCodeIcon data-icon="inline-start" />
          Show invite
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export { TranscriptCard, GroupsEmptyState }
