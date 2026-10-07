"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  RefreshCwIcon,
  UploadCloudIcon,
  XCircleIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { formatBytes, formatDuration } from "@/components/slai/lib/format"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"

/** Splits "lesson.webm" into ["lesson", ".webm"] so the extension stays fixed. */
function splitExtension(filename: string): [string, string] {
  const dot = filename.lastIndexOf(".")
  return dot > 0 ? [filename.slice(0, dot), filename.slice(dot)] : [filename, ""]
}

function SummaryRows({
  rows,
}: {
  rows: Array<[string, React.ReactNode]>
}) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="text-right tabular-nums text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * "Recording ready" form: duration and size, an editable file name (the
 * extension is kept), and the languages spoken. Presentational body — place
 * it in a Card, Dialog or page.
 */
function RecordingReadyPanel({
  durationSeconds,
  sizeBytes,
  defaultFilename,
  languageOptions,
  onUpload,
  onDiscard,
  className,
}: {
  durationSeconds: number
  sizeBytes: number
  defaultFilename: string
  languageOptions: string[]
  /** Receives the final file name (with extension) and spoken languages */
  onUpload: (filename: string, languages: string[]) => void
  onDiscard?: () => void
  className?: string
}) {
  const [base, extension] = splitExtension(defaultFilename)
  const [name, setName] = React.useState(base)
  const [languages, setLanguages] = React.useState<string[]>([])

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <SummaryRows
        rows={[
          ["Duration", formatDuration(durationSeconds)],
          ["Size", formatBytes(sizeBytes)],
        ]}
      />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="slai-recording-name">File name</FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              id="slai-recording-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {extension && (
              <span className="text-sm text-muted-foreground">{extension}</span>
            )}
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="slai-recording-languages">
            Languages spoken
            <span className="font-normal text-muted-foreground">
              — optional
            </span>
          </FieldLabel>
          <LanguageMultiSelect
            id="slai-recording-languages"
            options={languageOptions}
            value={languages}
            onChange={setLanguages}
            helperText="Helps transcription accuracy."
          />
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-2">
        {onDiscard && (
          <Button variant="outline" onClick={onDiscard}>
            Discard
          </Button>
        )}
        <Button
          disabled={!name.trim()}
          onClick={() => onUpload(`${name.trim()}${extension}`, languages)}
        >
          <UploadCloudIcon data-icon="inline-start" />
          Upload
        </Button>
      </div>
    </div>
  )
}

/** In-flight upload with retry progress ("Attempt 2 of 4"). */
function RecordingUploadingPanel({
  title = "Uploading recording",
  attempt = 1,
  totalAttempts = 1,
  className,
}: {
  title?: string
  attempt?: number
  totalAttempts?: number
  className?: string
}) {
  return (
    <div
      role="status"
      className={cn("flex flex-col items-center gap-4 py-4 text-center", className)}
    >
      <Spinner className="size-8 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          Please keep this page open while your recording uploads.
        </p>
      </div>
      {totalAttempts > 1 && (
        <div className="flex w-full max-w-xs flex-col gap-1.5">
          <Progress value={(attempt / totalAttempts) * 100} />
          <p className="text-xs text-muted-foreground tabular-nums">
            Attempt {attempt} of {totalAttempts}
          </p>
        </div>
      )}
    </div>
  )
}

/** Upload finished: summary of the saved recording and a next action. */
function RecordingDonePanel({
  name,
  durationSeconds,
  sizeBytes,
  note,
  actionLabel = "New recording",
  onAction,
  className,
}: {
  name: string
  durationSeconds: number
  sizeBytes: number
  /** Extra line under the summary, e.g. where to find the recording */
  note?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <CheckCircle2Icon className="size-10 text-status-uploaded" />
      <p className="text-sm font-medium">Recording saved</p>
      <div className="w-full max-w-xs">
        <SummaryRows
          rows={[
            ["Name", <span key="n" className="break-all">{name}</span>],
            ["Duration", formatDuration(durationSeconds)],
            ["Size", formatBytes(sizeBytes)],
          ]}
        />
      </div>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}
      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  )
}

/**
 * Upload failed. Retrying the upload keeps the recording; "Start over"
 * (via `onRetryFlow`) discards it. Mic-permission failures use
 * MicPermissionError instead.
 */
function UploadErrorPanel({
  message = "We couldn't upload your recording.",
  onRetryUpload,
  onRetryFlow,
  className,
}: {
  message?: string
  onRetryUpload?: () => void
  onRetryFlow?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn("flex flex-col items-center gap-4 text-center", className)}
    >
      <XCircleIcon className="size-10 text-destructive" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Upload failed</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-2">
        {onRetryFlow && (
          <Button variant="outline" onClick={onRetryFlow}>
            Start over
          </Button>
        )}
        {onRetryUpload && (
          <Button onClick={onRetryUpload}>
            <RefreshCwIcon data-icon="inline-start" />
            Retry upload
          </Button>
        )}
      </div>
    </div>
  )
}

export {
  RecordingReadyPanel,
  RecordingUploadingPanel,
  RecordingDonePanel,
  UploadErrorPanel,
}
