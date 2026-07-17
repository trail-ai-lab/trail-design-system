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
import { initials } from "@/components/slai/lib/format"
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
  /** Detected language, e.g. "Marathi" */
  language: string
  original: string
  /** Rendered stacked below the original; hidden when identical */
  translation?: string
}

function RecordedRow({
  entry,
  speakerLabel,
  speakerInitials,
}: {
  entry: RecordedEntry
  speakerLabel: string
  speakerInitials: string
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
    />
  )
}

function ManageSpeakers({
  speakers,
  onRename,
  onAdd,
  onRemove,
}: {
  speakers: RecordedSpeaker[]
  onRename: (id: string, name: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <UsersIcon data-icon="inline-start" />
          Manage speakers
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">Speakers</p>
            <p className="text-xs text-muted-foreground">
              Name the speakers the recording detected, or add and remove them.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {speakers.map((speaker, index) => (
              <div key={speaker.id} className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>
                    {speaker.name?.trim()
                      ? initials(speaker.name)
                      : index + 1}
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
                  aria-label={`Remove Speaker ${index + 1}`}
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
 */
function RecordedTranscriptCard({
  speakers: speakersProp,
  entries,
  onSpeakersChange,
  className,
}: {
  /** Detected speakers; `name` is blank until the teacher assigns one */
  speakers: RecordedSpeaker[]
  entries: RecordedEntry[]
  onSpeakersChange?: (speakers: RecordedSpeaker[]) => void
  className?: string
}) {
  const [speakers, setSpeakers] = React.useState(speakersProp)
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

  return (
    <Card className={cn("flex min-h-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
        <CardAction>
          <ManageSpeakers
            speakers={speakers}
            onRename={rename}
            onAdd={add}
            onRemove={remove}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-5 px-(--card-spacing) py-1">
            {entries.map((entry) => {
              const speaker = byId.get(entry.speakerId)
              const named = speaker?.name?.trim()
              const label = named
                ? named
                : `Speaker ${speaker?.ordinal ?? "?"}`
              const avatar = named
                ? initials(named)
                : String(speaker?.ordinal ?? "?")
              return (
                <RecordedRow
                  key={entry.id}
                  entry={entry}
                  speakerLabel={label}
                  speakerInitials={avatar}
                />
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { RecordedTranscriptCard }
