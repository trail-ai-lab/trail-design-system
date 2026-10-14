"use client"

import * as React from "react"
import { PlusIcon, UsersIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { initials } from "@/lib/format"
import { useControllableState } from "@/lib/use-controllable-state"
import { SectionLabel } from "@/components/patterns/section-label"
import { TranscriptUtteranceRow } from "@/components/slai/transcript-utterance-row"

export interface RecordedSpeaker {
  id: string
  /** Teacher-assigned name; blank shows the diarized "Speaker N" label */
  name?: string
}

export interface RecordedEntry {
  id: string
  speakerId: string
  /** Formatted time of the utterance, e.g. "3:42 PM" */
  timestamp?: string
  /** Detected language in plain English, e.g. "Marathi"; omit when unknown */
  language?: string
  original: string
  /** Rendered stacked below the original; hidden when identical */
  translation?: string
}

function RecordedRow({
  entry,
  speakerLabel,
  speakerInitials,
  isHighlighted,
  isPlaying,
  onPlayToggle,
}: {
  entry: RecordedEntry
  speakerLabel: string
  speakerInitials: string
  isHighlighted?: boolean
  isPlaying?: boolean
  onPlayToggle?: () => void
}) {
  return (
    <TranscriptUtteranceRow
      leading={
        <Avatar size="sm" className="mt-0.5">
          <AvatarFallback>{speakerInitials}</AvatarFallback>
        </Avatar>
      }
      meta={<span className="font-medium text-foreground">{speakerLabel}</span>}
      entry={entry}
      isHighlighted={isHighlighted}
      isPlaying={isPlaying}
      onPlayToggle={onPlayToggle}
    />
  )
}

function ManageSpeakers({
  speakers,
  onRename,
  onAdd,
  onRemove,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  speakers: RecordedSpeaker[]
  onRename: (id: string, name: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const titleId = React.useId()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <UsersIcon data-icon="inline-start" />
          Manage speakers
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80" aria-labelledby={titleId}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p id={titleId} className="text-sm font-medium">
              Speakers
            </p>
            <p className="text-xs text-muted-foreground">
              Name the speakers the recording detected, or add and remove them.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {speakers.map((speaker, index) => (
              <div key={speaker.id} className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>
                    {speaker.name?.trim() ? initials(speaker.name) : index + 1}
                  </AvatarFallback>
                </Avatar>
                <Input
                  value={speaker.name ?? ""}
                  placeholder={`Speaker ${index + 1}`}
                  aria-label={`Name for Speaker ${index + 1}`}
                  className="h-8"
                  onChange={(event) => onRename(speaker.id, event.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${speaker.name?.trim() || `Speaker ${index + 1}`}`}
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(speaker.id)}
                >
                  <XIcon />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <PlusIcon data-icon="inline-start" />
            Add speaker
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Diarized transcript of a finished recording. Diarization returns anonymous
 * "Speaker N" labels; the teacher assigns names (and can add or remove
 * speakers) via Manage speakers. Attribution may differ from the live view.
 *
 * `embedded` renders it as a labelled subsection with no card chrome and no
 * scroller of its own, for use inside another card that scrolls
 * (DiarizationPanel).
 *
 * `highlightedEntryId` / `highlightedEntryIds` (e.g. the lines a chat answer
 * cites) emphasize those lines and scroll the first into view.
 */
function RecordedTranscriptCard({
  speakers: speakersProp,
  entries,
  onSpeakersChange,
  highlightedEntryId,
  highlightedEntryIds,
  playingEntryId,
  onPlayEntry,
  manageSpeakers = true,
  manageSpeakersOpen,
  defaultManageSpeakersOpen,
  onManageSpeakersOpenChange,
  variant = "card",
  className,
}: {
  /** Detected speakers; `name` is blank until the teacher assigns one */
  speakers: RecordedSpeaker[]
  entries: RecordedEntry[]
  onSpeakersChange?: (speakers: RecordedSpeaker[]) => void
  /** Entry to emphasize, e.g. the sentence a chat answer cites */
  highlightedEntryId?: string
  /** Several entries to emphasize, e.g. every passage a chat answer cites;
   * combined with `highlightedEntryId` */
  highlightedEntryIds?: string[]
  /** Entry whose audio segment is currently playing */
  playingEntryId?: string
  /** Adds a per-utterance play button; called with the entry to toggle */
  onPlayEntry?: (entry: RecordedEntry) => void
  /** Offer renaming, adding and removing speakers here. Turn off when names
   * come from elsewhere (e.g. assigned to students in a ContributionPanel):
   * the card then shows `speakers` as passed, kept in sync. */
  manageSpeakers?: boolean
  /** Whether the Manage speakers popover is open (controlled) */
  manageSpeakersOpen?: boolean
  defaultManageSpeakersOpen?: boolean
  onManageSpeakersOpenChange?: (open: boolean) => void
  variant?: "card" | "embedded"
  className?: string
}) {
  const [managed, setSpeakers] = React.useState(speakersProp)
  // Start over from the passed speakers whenever they change (a new
  // recording or scope, or a re-analysis).
  const [syncedProp, setSyncedProp] = React.useState(speakersProp)
  if (speakersProp !== syncedProp) {
    setSyncedProp(speakersProp)
    setSpeakers(speakersProp)
  }
  const speakers = manageSpeakers ? managed : speakersProp
  const addedCount = React.useRef(0)

  const commit = (next: RecordedSpeaker[]) => {
    setSpeakers(next)
    onSpeakersChange?.(next)
  }

  const rename = (id: string, name: string) =>
    commit(
      speakers.map((speaker) =>
        speaker.id === id ? { ...speaker, name } : speaker
      )
    )

  const add = () => {
    addedCount.current += 1
    commit([...speakers, { id: `added-${addedCount.current}`, name: "" }])
  }

  const remove = (id: string) =>
    commit(speakers.filter((speaker) => speaker.id !== id))

  // Stable ordinal + name lookup for each speaker.
  const byId = React.useMemo(() => {
    const map = new Map<string, { name?: string; ordinal: number }>()
    speakers.forEach((speaker, index) =>
      map.set(speaker.id, { name: speaker.name, ordinal: index + 1 })
    )
    return map
  }, [speakers])

  const highlighted = React.useMemo(() => {
    const ids = new Set(highlightedEntryIds)
    if (highlightedEntryId) ids.add(highlightedEntryId)
    return ids
  }, [highlightedEntryId, highlightedEntryIds])
  // Changes when the set of highlighted lines does, not on every new array.
  const highlightKey = [...highlighted].join("\n")

  // Bring the first highlighted line into view (in whichever box scrolls).
  const rootRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!highlightKey) return
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches
    rootRef.current
      ?.querySelector(
        '[data-slot="transcript-utterance-row"][data-highlighted]'
      )
      ?.scrollIntoView({
        block: "center",
        behavior: reduceMotion ? "auto" : "smooth",
      })
  }, [highlightKey])

  const manage = manageSpeakers && (
    <ManageSpeakers
      speakers={speakers}
      onRename={rename}
      onAdd={add}
      onRemove={remove}
      open={manageSpeakersOpen}
      defaultOpen={defaultManageSpeakersOpen}
      onOpenChange={onManageSpeakersOpenChange}
    />
  )
  const rows = entries.map((entry) => {
    const speaker = byId.get(entry.speakerId)
    const named = speaker?.name?.trim()
    const label = named ? named : `Speaker ${speaker?.ordinal ?? "?"}`
    const avatar = named ? initials(named) : String(speaker?.ordinal ?? "?")
    return (
      <RecordedRow
        key={entry.id}
        entry={entry}
        speakerLabel={label}
        speakerInitials={avatar}
        isHighlighted={highlighted.has(entry.id)}
        isPlaying={entry.id === playingEntryId}
        onPlayToggle={onPlayEntry && (() => onPlayEntry(entry))}
      />
    )
  })

  if (variant === "embedded") {
    return (
      <section
        ref={rootRef}
        data-slot="recorded-transcript-card"
        data-variant={variant}
        className={cn("flex flex-col gap-3", className)}
      >
        <div className="flex items-center justify-between gap-2">
          <SectionLabel>Transcript</SectionLabel>
          {manage}
        </div>
        <div className="flex flex-col gap-5">{rows}</div>
      </section>
    )
  }

  return (
    <Card
      ref={rootRef}
      data-slot="recorded-transcript-card"
      data-variant={variant}
      className={cn("flex min-h-0 flex-col", className)}
    >
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
        {manage && <CardAction>{manage}</CardAction>}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-5 px-(--card-spacing) py-1">
            {rows}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { RecordedTranscriptCard }
