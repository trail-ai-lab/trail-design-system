import * as React from "react"
import { LanguagesIcon, PauseIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TranscriptUtterance {
  /** Formatted time of the utterance, e.g. "3:42 PM" */
  timestamp?: string
  /** Detected language of the utterance, e.g. "Marathi" */
  language: string
  original: string
  /** Rendered stacked below the original; hidden when identical to it */
  translation?: string
}

/**
 * One utterance row shared by TranscriptCard's live view and
 * RecordedTranscriptCard's diarized view. `leading` is the speaker/group
 * indicator (an avatar or icon circle); `meta` is the first item in the
 * label line (a speaker name or group badge) — everything else about the
 * row (language, timestamp, original + translation text) is identical
 * between the two views.
 */
function TranscriptUtteranceRow({
  leading,
  meta,
  entry,
  highlighted = false,
  playing,
  onPlayToggle,
  className,
}: {
  leading: React.ReactNode
  meta?: React.ReactNode
  entry: TranscriptUtterance
  /** Marks the row as the one a chat answer or search result points to */
  highlighted?: boolean
  /** Whether this utterance's audio is playing; only used with `onPlayToggle` */
  playing?: boolean
  /** Adds a play/pause button that plays just this utterance's audio */
  onPlayToggle?: () => void
  className?: string
}) {
  const showTranslation =
    Boolean(entry.translation) && entry.translation !== entry.original

  return (
    <div
      data-highlighted={highlighted || undefined}
      className={cn(
        "flex gap-3 data-[highlighted]:-mx-2 data-[highlighted]:rounded-xl data-[highlighted]:bg-primary/10 data-[highlighted]:px-2 data-[highlighted]:py-1.5",
        className
      )}
    >
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          {meta}
          {onPlayToggle && (
            <button
              type="button"
              onClick={onPlayToggle}
              aria-label={playing ? "Pause segment" : "Play segment"}
              className="flex size-5 items-center justify-center rounded-full bg-muted text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              {playing ? (
                <PauseIcon className="size-3" />
              ) : (
                <PlayIcon className="size-3" />
              )}
            </button>
          )}
          <span>{entry.language}</span>
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

export { TranscriptUtteranceRow }
