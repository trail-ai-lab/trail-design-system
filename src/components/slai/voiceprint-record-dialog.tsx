"use client"

import * as React from "react"
import { MicIcon, RotateCcwIcon, SquareIcon } from "lucide-react"

import { useControllableState } from "@/lib/use-controllable-state"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import { LiveWaveform } from "@/components/slai/live-waveform"
import { RecordingTimer } from "@/components/slai/recording-timer"

export type VoiceprintRecordStatus =
  "idle" | "starting" | "recording" | "recorded" | "saving"

/**
 * Records a student's voice sample with the teacher. The app owns the
 * microphone: it passes `status`, `seconds` and `stream` from its recorder,
 * and stops at `maxSeconds`. Recording can't start until the teacher confirms
 * the student agreed, and a sample under `minSeconds` can't be saved.
 */
function VoiceprintRecordDialog({
  studentName,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  status = "idle",
  seconds = 0,
  minSeconds = 30,
  maxSeconds = 60,
  stream,
  clipUrl,
  error,
  onStart,
  onStop,
  onRetake,
  onSave,
  className,
}: {
  studentName: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  status?: VoiceprintRecordStatus
  /** Seconds recorded so far, or the finished sample's length */
  seconds?: number
  /** Shortest sample that can be saved */
  minSeconds?: number
  /** Where the progress bar ends; the app stops the recorder here */
  maxSeconds?: number
  /** The recorder's microphone stream, for the waveform */
  stream?: MediaStream | null
  /** The finished sample, to listen to before saving */
  clipUrl?: string
  /** Why starting or saving failed */
  error?: string
  onStart?: () => void
  onStop?: () => void
  /** Discards the sample and returns to `idle` */
  onRetake?: () => void
  onSave?: () => void
  className?: string
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent data-slot="voiceprint-record-dialog" className={className}>
        {/* Mounted only while open, so each student starts unconfirmed. */}
        <VoiceprintRecordSteps
          studentName={studentName}
          status={status}
          seconds={seconds}
          minSeconds={minSeconds}
          maxSeconds={maxSeconds}
          stream={stream}
          clipUrl={clipUrl}
          error={error}
          onCancel={() => setOpen(false)}
          onStart={onStart}
          onStop={onStop}
          onRetake={onRetake}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  )
}

function VoiceprintRecordSteps({
  studentName,
  status,
  seconds,
  minSeconds,
  maxSeconds,
  stream,
  clipUrl,
  error,
  onCancel,
  onStart,
  onStop,
  onRetake,
  onSave,
}: {
  studentName: string
  status: VoiceprintRecordStatus
  seconds: number
  minSeconds: number
  maxSeconds: number
  stream?: MediaStream | null
  clipUrl?: string
  error?: string
  onCancel: () => void
  onStart?: () => void
  onStop?: () => void
  onRetake?: () => void
  onSave?: () => void
}) {
  const [confirmed, setConfirmed] = React.useState(false)
  const consentId = React.useId()
  const busy = status === "starting" || status === "saving"
  const before = status === "idle" || status === "starting"
  const tooShort = status === "recorded" && seconds < minSeconds

  return (
    <>
      <DialogHeader>
        <DialogTitle>Record {studentName}&apos;s voiceprint</DialogTitle>
        <DialogDescription>
          A {minSeconds} to {maxSeconds} second sample helps match {studentName}{" "}
          to their voice in group recordings.
        </DialogDescription>
      </DialogHeader>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {before && (
        <>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
            <li>
              Ask {studentName} to say their name, then talk about a favorite
              game, food or place.
            </li>
            <li>If they speak more than one language, ask them to use each.</li>
            <li>
              Hold the microphone about as far away as it is in group work.
            </li>
          </ul>
          <Field orientation="horizontal">
            <Checkbox
              id={consentId}
              checked={confirmed}
              disabled={busy}
              onCheckedChange={(checked) => setConfirmed(checked === true)}
            />
            <FieldLabel htmlFor={consentId} className="font-normal">
              {studentName} has agreed to have their voice recorded.
            </FieldLabel>
          </Field>
        </>
      )}

      {status === "recording" && (
        <div className="flex flex-col gap-3">
          <LiveWaveform stream={stream} state="recording" className="h-16" />
          <Progress
            value={Math.min(100, (seconds / maxSeconds) * 100)}
            aria-label="Recording length"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <RecordingTimer compact seconds={seconds} />
            <span>
              {seconds < minSeconds
                ? `Keep going to at least ${minSeconds} seconds`
                : "Long enough; stop when ready"}
            </span>
          </div>
        </div>
      )}

      {(status === "recorded" || status === "saving") && (
        <div className="flex flex-col gap-3">
          <AudioPlayerCard
            compact
            title={`${studentName}'s sample`}
            src={clipUrl}
            durationSeconds={seconds}
          />
          {tooShort && (
            <Alert variant="destructive">
              <AlertDescription>
                This sample is too short. Record at least {minSeconds} seconds.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <DialogFooter>
        {before && (
          <>
            <Button variant="outline" disabled={busy} onClick={onCancel}>
              Cancel
            </Button>
            <Button disabled={!confirmed || busy} onClick={onStart}>
              {busy ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <MicIcon data-icon="inline-start" />
              )}
              {busy ? "Starting…" : "Start recording"}
            </Button>
          </>
        )}
        {status === "recording" && (
          <Button onClick={onStop}>
            <SquareIcon data-icon="inline-start" />
            Stop
          </Button>
        )}
        {(status === "recorded" || status === "saving") && (
          <>
            <Button variant="outline" disabled={busy} onClick={onRetake}>
              <RotateCcwIcon data-icon="inline-start" />
              Record again
            </Button>
            <Button disabled={tooShort || busy} onClick={onSave}>
              {status === "saving" && <Spinner data-icon="inline-start" />}
              {status === "saving" ? "Saving…" : "Save voiceprint"}
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  )
}

export { VoiceprintRecordDialog }
