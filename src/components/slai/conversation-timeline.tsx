import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatElapsed } from "@/components/slai/lib/format"
import { SPEAKER_FILLS } from "@/components/slai/contribution-panel"

export interface TimelineSegment {
  id: string
  speakerId: string
  speakerName: string
  /** Seconds from the start of the recording */
  startSec: number
  text: string
  /** Language code of the speech, e.g. "ES" */
  language?: string
  translatedText?: string
}

/**
 * Vertical conversation rail: a dot per utterance on a connecting line, with
 * the speaker, timestamp, optional language tag, text and translation. Each
 * speaker keeps the same dot color as in ContributionPanel.
 */
function ConversationTimeline({
  segments,
  className,
}: {
  segments: TimelineSegment[]
  className?: string
}) {
  const speakerIds = [...new Set(segments.map((s) => s.speakerId))]
  return (
    <ol className={cn("flex flex-col", className)}>
      {segments.map((segment, index) => {
        const fill =
          SPEAKER_FILLS[speakerIds.indexOf(segment.speakerId) % SPEAKER_FILLS.length]
        const last = index === segments.length - 1
        return (
          <li key={segment.id} className="relative flex gap-3 pb-5 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className="absolute top-3 bottom-0 left-[5px] w-px bg-border"
              />
            )}
            <span
              aria-hidden
              className={cn("relative mt-1.5 size-2.5 shrink-0 rounded-full", fill)}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {segment.speakerName}
                </span>
                <span className="tabular-nums">{formatElapsed(segment.startSec)}</span>
                {segment.language && (
                  <Badge variant="outline" className="h-4 px-1.5 uppercase">
                    {segment.language}
                  </Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed">{segment.text}</p>
              {segment.translatedText && (
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  {segment.translatedText}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { ConversationTimeline }
