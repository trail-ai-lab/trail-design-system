"use client"

import * as React from "react"
import {
  CheckIcon,
  MessageCircleIcon,
  MicIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  SquareIcon,
  VolumeXIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import { LiveWaveform } from "@/components/slai/live-waveform"
import type { VoiceprintRecordStatus } from "@/components/slai/voiceprint-record-dialog"

export type StudentVoiceRecordStatus = VoiceprintRecordStatus | "saved"

/** Free talk, not reading: it suits every reading level and sounds like group work. */
const questions = (name: string) => [
  `Say: "My name is ${name}."`,
  "What food do you like best? Why?",
  "What game or sport do you like? How do you play it?",
  "Do you speak another language? Say something in it!",
  "What place do you like to go? What do you do there?",
  "What would you do on a day with no school?",
]

const READ_ALOUD =
  "My favorite time of day is after lunch. The sun is out and my friends are nearby. We talk about games, books and what we want to do next. Some days we laugh so much that we forget the time. I like days like that."

/** Saying a name takes moments; the other questions need time to answer */
const NAME_PROMPT_MS = 6000
const QUESTION_MS = 15000

function ReadyStep({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted [&_svg]:size-5">
        {icon}
      </span>
      {children}
    </li>
  )
}

/** The question on screen: moves on by itself, or when the student asks. */
function usePrompt(name: string) {
  const prompts = React.useMemo(() => questions(name), [name])
  const [index, setIndex] = React.useState(0)
  const [isReading, setIsReading] = React.useState(false)

  React.useEffect(() => {
    if (isReading) return
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % prompts.length),
      index === 0 ? NAME_PROMPT_MS : QUESTION_MS
    )
    return () => clearTimeout(timer)
  }, [index, isReading, prompts.length])

  return {
    prompt: isReading ? READ_ALOUD : prompts[index],
    isReading,
    next: () => {
      setIsReading(false)
      setIndex((i) => (i + 1) % prompts.length)
    },
    read: () => setIsReading(true),
  }
}

function RecordingStep({
  studentName,
  seconds,
  speechSeconds,
  speechGoalSeconds,
  isSilent,
  minSeconds,
  stream,
  onStop,
  className,
}: {
  studentName: string
  seconds: number
  speechSeconds: number
  speechGoalSeconds: number
  isSilent: boolean
  minSeconds: number
  stream?: MediaStream | null
  onStop?: () => void
  className?: string
}) {
  const { prompt, isReading, next, read } = usePrompt(studentName)
  const isLongEnough =
    seconds >= minSeconds && speechSeconds >= speechGoalSeconds
  const filled = Math.min(
    (speechSeconds / speechGoalSeconds) * 100,
    (seconds / minSeconds) * 100,
    100
  )
  return (
    <Card data-slot="student-voice-recorder" className={className}>
      <CardHeader>
        <CardTitle>
          {isReading ? "Read this out loud" : "Talk about this"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p
          aria-live="polite"
          className={cn("font-medium", isReading ? "text-base" : "text-h3")}
        >
          {prompt}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 flex-1" onClick={next}>
            <RefreshCwIcon data-icon="inline-start" />
            New question
          </Button>
          {!isReading && (
            <Button variant="ghost" className="h-11 flex-1" onClick={read}>
              Read instead
            </Button>
          )}
        </div>
        <LiveWaveform stream={stream} state="recording" className="h-12" />
        <Progress value={filled} aria-label="How much you've talked" />
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {isLongEnough
            ? "Great! You can stop now, or keep talking."
            : isSilent
              ? "We can't hear you. Keep talking!"
              : "Keep talking until the bar is full."}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant={isLongEnough ? "default" : "outline"}
          className="h-11 w-full"
          onClick={onStop}
        >
          <SquareIcon data-icon="inline-start" />
          {isLongEnough ? "I'm done" : "Stop"}
        </Button>
      </CardFooter>
    </Card>
  )
}

/**
 * A student records their own voice sample on a joined device, with
 * instructions written for grades 4 to 8: one idea per screen, and questions
 * to answer while recording. The app owns the microphone, as with
 * `VoiceprintRecordDialog`, and stops at `maxSeconds`.
 *
 * The bar follows `speechSeconds`, so it only fills while the student talks.
 * It's a guide: only `minSeconds` is enforced here.
 */
function StudentVoiceRecorder({
  studentName,
  status = "idle",
  seconds = 0,
  speechSeconds = 0,
  speechGoalSeconds = 25,
  isSilent = false,
  minSeconds = 30,
  stream,
  clipUrl,
  error,
  onCancel,
  onStart,
  onStop,
  onRetake,
  onSave,
  onDone,
  className,
}: {
  studentName: string
  status?: StudentVoiceRecordStatus
  /** Seconds recorded so far, or the finished sample's length */
  seconds?: number
  /** Seconds the student has been talking so far, pauses left out */
  speechSeconds?: number
  /** Talking time that fills the bar */
  speechGoalSeconds?: number
  /** The microphone has heard nothing for a moment */
  isSilent?: boolean
  /** Shortest sample that can be saved */
  minSeconds?: number
  /** The recorder's microphone stream, for the waveform */
  stream?: MediaStream | null
  /** The finished sample, to listen to before saving */
  clipUrl?: string
  /** Why starting or saving failed, in words a student can act on */
  error?: string
  /** The student said it isn't them, or not now */
  onCancel?: () => void
  onStart?: () => void
  onStop?: () => void
  /** Discards the sample and returns to `idle` */
  onRetake?: () => void
  onSave?: () => void
  /** Leaves the "saved" screen */
  onDone?: () => void
  className?: string
}) {
  const [hasConfirmed, setHasConfirmed] = React.useState(false)
  const before = status === "idle" || status === "starting"
  const starting = status === "starting"
  const saving = status === "saving"

  if (status === "saved") {
    return (
      <Card data-slot="student-voice-recorder" className={className}>
        <CardContent className="p-0">
          <Empty className="p-4">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CheckIcon />
              </EmptyMedia>
              <EmptyTitle>Thanks, {studentName}!</EmptyTitle>
              <EmptyDescription>
                Your voice is saved. If someone else needs a turn, pass the
                device to them.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={onDone}>Back to names</Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  const errorAlert = error && (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )

  if (before && !hasConfirmed) {
    return (
      <Card data-slot="student-voice-recorder" className={className}>
        <CardHeader>
          <CardTitle>Hi, {studentName}!</CardTitle>
          <CardDescription>
            Let&apos;s teach SLAI what your voice sounds like.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {errorAlert}
          <p>It helps your teacher know who said what when your group talks.</p>
          <p>Your teacher can listen to it. Your classmates can&apos;t.</p>
          <p>You don&apos;t have to do this. It&apos;s okay to say no.</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="h-11 w-full" onClick={() => setHasConfirmed(true)}>
            Yes, I&apos;m {studentName}
          </Button>
          <Button variant="outline" className="h-11 w-full" onClick={onCancel}>
            I&apos;m not {studentName}
          </Button>
          <Button variant="ghost" className="h-11 w-full" onClick={onCancel}>
            Not right now
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (before) {
    return (
      <Card data-slot="student-voice-recorder" className={className}>
        <CardHeader>
          <CardTitle>Get ready</CardTitle>
          <CardDescription>
            You&apos;ll talk for about a minute.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {errorAlert}
          <ul className="flex flex-col gap-3">
            <ReadyStep icon={<SmartphoneIcon />}>
              Hold the device like you do in group work.
            </ReadyStep>
            <ReadyStep icon={<VolumeXIcon />}>
              Ask the people near you to stay quiet.
            </ReadyStep>
            <ReadyStep icon={<MessageCircleIcon />}>
              Use your normal voice and answer the questions.
            </ReadyStep>
          </ul>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="h-11 w-full" disabled={starting} onClick={onStart}>
            {starting ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <MicIcon data-icon="inline-start" />
            )}
            {starting ? "Starting…" : "Start talking"}
          </Button>
          <Button
            variant="ghost"
            className="h-11 w-full"
            disabled={starting}
            onClick={onCancel}
          >
            Not right now
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (status === "recording") {
    return (
      // Mounted only while recording, so each take starts at the first question
      <RecordingStep
        studentName={studentName}
        seconds={seconds}
        speechSeconds={speechSeconds}
        speechGoalSeconds={speechGoalSeconds}
        isSilent={isSilent}
        minSeconds={minSeconds}
        stream={stream}
        onStop={onStop}
        className={className}
      />
    )
  }

  const tooShort = seconds < minSeconds
  return (
    <Card data-slot="student-voice-recorder" className={className}>
      <CardHeader>
        <CardTitle>{tooShort ? "Let's try again" : "Nice work!"}</CardTitle>
        <CardDescription>
          {tooShort
            ? "That was a little short. We need to hear you for longer."
            : "You can listen to it first if you want."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {errorAlert}
        {!tooShort && (
          <AudioPlayerCard
            compact
            title="Your recording"
            src={clipUrl}
            durationSeconds={seconds}
          />
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {!tooShort && (
          <Button className="h-11 w-full" disabled={saving} onClick={onSave}>
            {saving && <Spinner data-icon="inline-start" />}
            {saving ? "Saving…" : "Save my voice"}
          </Button>
        )}
        <Button
          variant={tooShort ? "default" : "outline"}
          className="h-11 w-full"
          disabled={saving}
          onClick={onRetake}
        >
          <RotateCcwIcon data-icon="inline-start" />
          Try again
        </Button>
        {tooShort && (
          <Button variant="ghost" className="h-11 w-full" onClick={onCancel}>
            Not right now
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export { StudentVoiceRecorder }
