"use client"

import * as React from "react"
import {
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"

import { formatClock } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"

type PlayerProps = {
  src?: string
  durationSeconds: number
  title: string
  onDownload?: () => void
  downloading: boolean
  compact: boolean
  error?: string
  audioRef?: React.Ref<HTMLAudioElement>
}

/** Assigns a node to a callback or object ref. */
function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node)
  else if (ref) ref.current = node
}

function Player({
  src,
  durationSeconds,
  title,
  onDownload,
  downloading,
  compact,
  error: errorProp,
  audioRef,
}: PlayerProps) {
  const audio = React.useRef<HTMLAudioElement | null>(null)
  // A ref, not state, so the timeupdate handler sees it mid-drag.
  const seeking = React.useRef(false)
  const durationProbed = React.useRef(false)
  const [playing, setPlaying] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [fileDuration, setFileDuration] = React.useState(0)
  // The file's own length once known; until then (or without a src) the prop.
  const duration = src && fileDuration > 0 ? fileDuration : durationSeconds
  const [playbackError, setPlaybackError] = React.useState<string>()

  // Without a src (stories, prototypes), simulate playback on a timer.
  React.useEffect(() => {
    if (src || !playing) return
    const id = setInterval(() => {
      setCurrent((value) => {
        if (value >= duration) {
          setPlaying(false)
          return duration
        }
        return value + 1
      })
    }, 250)
    return () => clearInterval(id)
  }, [src, playing, duration])

  const setAudioNode = React.useCallback(
    (node: HTMLAudioElement | null) => {
      audio.current = node
      assignRef(audioRef, node)
    },
    [audioRef]
  )

  const readDuration = () => {
    const element = audio.current
    if (!element) return
    if (Number.isFinite(element.duration) && element.duration > 0) {
      setFileDuration(element.duration)
    } else if (element.duration === Infinity && !durationProbed.current) {
      // MediaRecorder WebM files carry no duration, so the browser reports
      // Infinity. Seeking far past the end makes it scan the file and find the
      // real length; jump back to the start once it has.
      durationProbed.current = true
      const restore = () => {
        element.currentTime = 0
        element.removeEventListener("timeupdate", restore)
      }
      element.addEventListener("timeupdate", restore)
      element.currentTime = 1e101
    }
  }

  const togglePlay = () => {
    if (!src) {
      if (current >= duration) setCurrent(0)
      setPlaying((value) => !value)
      return
    }
    const element = audio.current
    if (!element) return
    if (element.paused) {
      element.play().catch(() => setPlaybackError("Audio playback failed."))
    } else {
      element.pause()
    }
  }

  const toggleMute = () => {
    if (audio.current) audio.current.muted = !muted
    setMuted(!muted)
  }

  const commitSeek = (value: number) => {
    if (audio.current && Number.isFinite(audio.current.duration)) {
      audio.current.currentTime = value
    }
    seeking.current = false
    setCurrent(value)
  }

  const error = errorProp ?? playbackError
  const atEnd = duration > 0 && current >= duration
  const max = duration > 0 ? duration : 1
  const buttonSize = compact ? "icon-sm" : "icon"

  const audioElement = src ? (
    // Recordings have no caption track; the page's transcript is the text alternative.
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      ref={setAudioNode}
      src={src}
      preload="metadata"
      onLoadedMetadata={readDuration}
      onDurationChange={readDuration}
      onTimeUpdate={(event) => {
        if (!seeking.current) setCurrent(event.currentTarget.currentTime)
      }}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onError={() => setPlaybackError("Audio playback failed.")}
    />
  ) : null

  if (error) {
    return (
      <CardContent>
        {audioElement}
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </CardContent>
    )
  }

  const slider = (
    <Slider
      value={[Math.min(current, max)]}
      min={0}
      max={max}
      step={src ? 0.1 : 1}
      onValueChange={([value]) => {
        seeking.current = true
        setCurrent(value)
      }}
      onValueCommit={([value]) => commitSeek(value)}
      aria-label="Seek"
      className={cn(compact && "flex-1")}
    />
  )

  const secondaryActions = (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={muted ? "Unmute" : "Mute"}
        aria-pressed={muted}
        onClick={toggleMute}
      >
        {muted ? <VolumeXIcon /> : <Volume2Icon />}
      </Button>
      {onDownload && (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Download recording"
          disabled={downloading}
          onClick={onDownload}
        >
          {downloading ? <Spinner /> : <DownloadIcon />}
        </Button>
      )}
    </>
  )

  return (
    <CardContent
      className={cn("flex items-center", compact ? "gap-2" : "gap-4")}
      role="group"
      aria-label={title}
    >
      {audioElement}
      <Button
        size={buttonSize}
        aria-label={playing ? "Pause" : atEnd ? "Replay" : "Play"}
        onClick={togglePlay}
      >
        {playing ? <PauseIcon /> : atEnd ? <RotateCcwIcon /> : <PlayIcon />}
      </Button>
      {compact ? (
        <>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {formatClock(current)} / {formatClock(duration)}
          </span>
          {slider}
        </>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {slider}
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatClock(current)}</span>
            <span>{formatClock(duration)}</span>
          </div>
        </div>
      )}
      <div className="flex shrink-0 items-center gap-1">{secondaryActions}</div>
    </CardContent>
  )
}

/**
 * Playback of a recording: play / pause, a scrubber with the current and
 * total time, mute and download.
 *
 * Pass `src` (e.g. a signed download URL) to play the real file; recordings
 * from `MediaRecorder` that report no duration are handled. Without `src`,
 * playback is simulated over `durationSeconds` (stories, prototypes). Use
 * `audioRef` to seek from outside, e.g. when a transcript line is played.
 */
function AudioPlayerCard({
  src,
  durationSeconds,
  title = "Recording",
  onDownload,
  downloading = false,
  compact = false,
  loading = false,
  error,
  audioRef,
  className,
}: {
  /** Audio file URL to play */
  src?: string
  /** Total length in seconds; the simulated length when there's no `src`.
   * With `src` the length comes from the file. */
  durationSeconds?: number
  /** Accessible name of the player */
  title?: string
  /** Shows a download button */
  onDownload?: () => void
  /** A download is in progress: the download button shows a spinner */
  downloading?: boolean
  /** Slim single-row player for details panels */
  compact?: boolean
  /** Audio is still being fetched */
  loading?: boolean
  /** Couldn't load the audio, e.g. "Failed to load audio for playback." */
  error?: string
  /** The underlying `<audio>` element, for seeking from outside */
  audioRef?: React.Ref<HTMLAudioElement>
  className?: string
}) {
  return (
    <Card data-slot="audio-player-card" className={className}>
      {loading ? (
        <CardContent className="flex items-center gap-4">
          <Skeleton
            className={cn("rounded-full", compact ? "size-7" : "size-9")}
          />
          <Skeleton className="h-2 flex-1" />
        </CardContent>
      ) : (
        <Player
          // A new file starts from a clean slate (position, duration, errors).
          key={src ?? "simulated"}
          src={src}
          durationSeconds={durationSeconds ?? (src ? 0 : 1453)}
          title={title}
          onDownload={onDownload}
          downloading={downloading}
          compact={compact}
          error={error}
          audioRef={audioRef}
        />
      )}
    </Card>
  )
}

export { AudioPlayerCard }
