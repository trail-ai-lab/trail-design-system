"use client"

import * as React from "react"
import { DownloadIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

// Deterministic bar heights (0.2–1) so the waveform is stable across renders.
const BARS = Array.from({ length: 72 }, (_, i) => {
  const wave =
    Math.abs(Math.sin(i * 0.5)) * 0.55 + Math.abs(Math.sin(i * 0.17)) * 0.45
  return 0.2 + wave * 0.8
})

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function Waveform({ progress }: { progress: number }) {
  return (
    <div className="flex h-10 items-center gap-0.5">
      {BARS.map((height, index) => {
        const played = index / BARS.length <= progress
        return (
          <span
            key={index}
            className={cn(
              "min-h-1 flex-1 rounded-full",
              played ? "bg-primary" : "bg-muted"
            )}
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        )
      })}
    </div>
  )
}

/**
 * Playback of the session recording: a waveform that fills as it plays, a
 * scrubber, and the current / total time. Audio is mocked for the design
 * system — playing advances the position on a timer.
 */
function AudioPlayerCard({
  durationSeconds = 1453,
  title = "Recording",
  onDownload,
  className,
}: {
  /** Total length of the recording in seconds */
  durationSeconds?: number
  title?: string
  onDownload?: () => void
  className?: string
}) {
  const [playing, setPlaying] = React.useState(false)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setCurrent((value) => {
        if (value >= durationSeconds) {
          setPlaying(false)
          return durationSeconds
        }
        return value + 1
      })
    }, 250)
    return () => clearInterval(id)
  }, [playing, durationSeconds])

  const progress = durationSeconds > 0 ? current / durationSeconds : 0
  const atEnd = current >= durationSeconds

  return (
    <Card className={className}>
      <CardContent
        className="flex items-center gap-4"
        role="group"
        aria-label={title}
      >
        <Button
          size="icon"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => {
            if (atEnd) setCurrent(0)
            setPlaying((value) => !value)
          }}
        >
          {playing ? (
            <PauseIcon />
          ) : atEnd ? (
            <RotateCcwIcon />
          ) : (
            <PlayIcon />
          )}
        </Button>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Waveform progress={progress} />
          <Slider
            value={[current]}
            min={0}
            max={durationSeconds}
            onValueChange={([value]) => setCurrent(value)}
            aria-label="Seek"
          />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatTime(current)}</span>
            <span>{formatTime(durationSeconds)}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Download recording"
          onClick={onDownload}
        >
          <DownloadIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export { AudioPlayerCard }
