"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { RecordingState } from "@/components/slai/recording-control"

const BAR_WIDTH = 3
const BAR_GAP = 2
const MIN_BAR_HEIGHT = 3
const FADE_WIDTH = 24
/** How often a new level is added while recording, in ms */
const SAMPLE_MS = 50

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/**
 * Scrolling bars of the microphone level while recording, read from the
 * recorder's own `stream` (the waveform never opens the microphone itself or
 * stops its tracks). A dotted line while idle; frozen and dimmed while
 * paused; a gentle wave while `loading` (starting or saving). Decorative —
 * the recording timer and caption carry the state for screen readers.
 * Modeled on the Showcase's live audio waveform.
 */
function LiveWaveform({
  stream,
  state = "idle",
  loading = false,
  className,
}: {
  /** The recorder's microphone stream; null or omitted draws no levels */
  stream?: MediaStream | null
  state?: RecordingState
  /** Starting or saving: shows a gentle wave instead of levels */
  loading?: boolean
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const analyserRef = React.useRef<AnalyserNode | null>(null)
  // Newest level last, each 0–1.
  const levelsRef = React.useRef<number[]>([])

  // Read levels from the stream while recording. Only our audio graph is torn
  // down on cleanup — the tracks belong to the recorder.
  React.useEffect(() => {
    if (!stream || state !== "recording") return
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AudioContextCtor) return
    const context = new AudioContextCtor()
    const analyser = context.createAnalyser()
    analyser.fftSize = 1024
    const source = context.createMediaStreamSource(stream)
    source.connect(analyser)
    analyserRef.current = analyser
    return () => {
      analyserRef.current = null
      source.disconnect()
      void context.close()
    }
  }, [stream, state])

  // A new recording starts from a clean line.
  React.useEffect(() => {
    if (state === "idle") levelsRef.current = []
  }, [state])

  // Draw loop.
  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    const reducedMotion = prefersReducedMotion()
    let frame = 0
    let lastSample = 0
    let phase = 0

    const draw = (now: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const step = BAR_WIDTH + BAR_GAP
      const barCount = Math.max(1, Math.floor(width / step))

      // Sample the current level.
      const analyser = analyserRef.current
      if (state === "recording" && analyser && now - lastSample >= SAMPLE_MS) {
        lastSample = now
        // Loudness: RMS of the waveform around its center (128), on a
        // square-root curve so quiet speech still shows.
        const data = new Uint8Array(analyser.fftSize)
        analyser.getByteTimeDomainData(data)
        let sum = 0
        for (const value of data) sum += ((value - 128) / 128) ** 2
        const rms = Math.sqrt(sum / data.length)
        const level = Math.min(1, Math.sqrt(rms) * 1.4)
        levelsRef.current.push(Math.max(0.05, level))
        if (levelsRef.current.length > barCount)
          levelsRef.current.splice(0, levelsRef.current.length - barCount)
      }

      // While starting or saving, a gentle wave stands in for levels.
      let levels = levelsRef.current
      if (loading) {
        phase += reducedMotion ? 0 : 0.04
        levels = Array.from({ length: barCount }, (_, i) => {
          const x = (i - barCount / 2) / (barCount / 2)
          const wave =
            Math.sin(phase * 1.5 + x * 3) * 0.2 + Math.cos(phase * 2 + x) * 0.12
          return Math.max(0.05, (0.22 + wave) * (1 - Math.abs(x) * 0.4))
        })
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getComputedStyle(canvas).color
      const centerY = height / 2
      // Newest bar at the right edge, scrolling left.
      for (let i = 0; i < levels.length && i < barCount; i++) {
        const level = levels[levels.length - 1 - i]
        const x = width - (i + 1) * step
        const barHeight = Math.max(MIN_BAR_HEIGHT, level * height * 0.85)
        ctx.globalAlpha = 0.4 + level * 0.6
        ctx.beginPath()
        ctx.roundRect(x, centerY - barHeight / 2, BAR_WIDTH, barHeight, 1.5)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Fade both edges.
      if (width > 0) {
        const fade = Math.min(0.3, FADE_WIDTH / width)
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, "rgba(0,0,0,1)")
        gradient.addColorStop(fade, "rgba(0,0,0,0)")
        gradient.addColorStop(1 - fade, "rgba(0,0,0,0)")
        gradient.addColorStop(1, "rgba(0,0,0,1)")
        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = "source-over"
      }

      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [state, loading])

  const isIdle = state === "idle" && !loading

  return (
    <div
      ref={containerRef}
      data-slot="live-waveform"
      data-state={state}
      aria-hidden
      className={cn(
        "relative h-16 w-full transition-colors duration-base",
        state === "recording" && !loading
          ? "text-status-recording"
          : "text-muted-foreground",
        state === "paused" && "opacity-50",
        className
      )}
    >
      {isIdle && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dotted border-muted-foreground/30" />
      )}
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}

export { LiveWaveform }
