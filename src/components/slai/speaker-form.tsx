"use client"

import { MinusIcon, PlusIcon, RefreshCwIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type SpeakerCountMode = "auto" | "manual"

const MIN_SPEAKERS = 2
const MAX_SPEAKERS = 6

/**
 * Controls for speaker diarization: let the model pick the number of
 * speakers (`auto`) or set it yourself (`manual`, 2 to 6), then analyze.
 * Once a result exists, `analyzed` relabels the button "Re-analyze".
 *
 * The mode (`value`) and `speakerCount` are each controlled or left to the
 * form (`defaultValue`, `defaultSpeakerCount`).
 */
function SpeakerForm({
  value: valueProp,
  defaultValue = "auto",
  onValueChange,
  speakerCount: speakerCountProp,
  defaultSpeakerCount = MIN_SPEAKERS,
  onSpeakerCountChange,
  analyzed = false,
  loading = false,
  onAnalyze,
  className,
}: {
  /** Speaker count mode (controlled) */
  value?: SpeakerCountMode
  defaultValue?: SpeakerCountMode
  onValueChange?: (value: SpeakerCountMode) => void
  /** Number of speakers in `manual` mode, 2 to 6 (controlled) */
  speakerCount?: number
  defaultSpeakerCount?: number
  onSpeakerCountChange?: (count: number) => void
  /** A result already exists */
  analyzed?: boolean
  loading?: boolean
  onAnalyze?: () => void
  className?: string
}) {
  const [mode, setMode] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })
  const [speakerCount, setSpeakerCount] = useControllableState({
    value: speakerCountProp,
    defaultValue: defaultSpeakerCount,
    onChange: onSpeakerCountChange,
  })

  return (
    <div
      data-slot="speaker-form"
      className={cn("flex flex-wrap items-center gap-3", className)}
    >
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={mode}
        onValueChange={(next) => next && setMode(next as SpeakerCountMode)}
        aria-label="Speaker count mode"
        disabled={loading}
      >
        <ToggleGroupItem value="auto">Auto</ToggleGroupItem>
        <ToggleGroupItem value="manual">Manual</ToggleGroupItem>
      </ToggleGroup>

      {mode === "manual" && (
        <div
          role="group"
          aria-label="Number of speakers"
          className="flex items-center gap-1"
        >
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Fewer speakers"
            disabled={loading || speakerCount <= MIN_SPEAKERS}
            onClick={() => setSpeakerCount(speakerCount - 1)}
          >
            <MinusIcon />
          </Button>
          <span className="flex min-w-16 items-center justify-center gap-1.5 text-sm tabular-nums">
            <UsersIcon className="size-3.5 text-muted-foreground" />
            {speakerCount}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="More speakers"
            disabled={loading || speakerCount >= MAX_SPEAKERS}
            onClick={() => setSpeakerCount(speakerCount + 1)}
          >
            <PlusIcon />
          </Button>
        </div>
      )}

      <Button
        size="sm"
        variant={analyzed ? "outline" : "default"}
        disabled={loading}
        onClick={onAnalyze}
        className="ml-auto"
      >
        {loading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          analyzed && <RefreshCwIcon data-icon="inline-start" />
        )}
        {loading ? "Analyzing…" : analyzed ? "Re-analyze" : "Analyze speakers"}
      </Button>
    </div>
  )
}

export { SpeakerForm }
