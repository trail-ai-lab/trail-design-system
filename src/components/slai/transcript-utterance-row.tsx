import * as React from "react"
import { LanguagesIcon } from "lucide-react"

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
}: {
  leading: React.ReactNode
  meta?: React.ReactNode
  entry: TranscriptUtterance
}) {
  const showTranslation =
    Boolean(entry.translation) && entry.translation !== entry.original

  return (
    <div className="flex gap-3">
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          {meta}
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
