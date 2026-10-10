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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { formatBytes, formatDuration } from "@/lib/format"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import { DetailList } from "@/components/patterns/detail-list"
import type { LanguageOptions } from "@/components/slai/lib/language-option"

/** Splits "lesson.webm" into ["lesson", ".webm"] so the extension stays fixed. */
function splitExtension(filename: string): [string, string] {
  const dot = filename.lastIndexOf(".")
  return dot > 0
    ? [filename.slice(0, dot), filename.slice(dot)]
    : [filename, ""]
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
  /** Languages to offer; `{ value, label }` pairs report values */
  languageOptions: LanguageOptions
  /** Receives the final file name (with extension) and spoken languages */
  onUpload: (filename: string, languages: string[]) => void
  onDiscard?: () => void
  className?: string
}) {
  const uid = React.useId()
  const [base, extension] = splitExtension(defaultFilename)
  const [name, setName] = React.useState(base)
  const [languages, setLanguages] = React.useState<string[]>([])

  return (
    <div
      data-slot="recording-ready-panel"
      className={cn("flex flex-col gap-5", className)}
    >
      <DetailList
        items={[
          { label: "Duration", value: formatDuration(durationSeconds) },
          { label: "Size", value: formatBytes(sizeBytes) },
        ]}
      />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${uid}-recording-name`}>Name</FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              id={`${uid}-recording-name`}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {extension && (
              <span className="text-sm text-muted-foreground">{extension}</span>
            )}
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${uid}-recording-languages`}>
            Languages spoken
            <span className="font-normal text-muted-foreground">
              — optional
            </span>
          </FieldLabel>
          <LanguageMultiSelect
            id={`${uid}-recording-languages`}
            options={languageOptions}
            value={languages}
            onValueChange={setLanguages}
            helperText="Helps transcription accuracy."
          />
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-2">
        {onDiscard && (
          <ConfirmDialog
            trigger={<Button variant="outline">Discard</Button>}
            title="Discard this recording?"
            description="It hasn't been uploaded yet, so it will be lost. This cannot be undone."
            confirmLabel="Discard"
            onConfirm={onDiscard}
          />
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

/**
 * In-flight upload, laid out like an empty state: spinner, title, and a
 * reminder to keep the page open. Retry progress ("Attempt 2 of 4") shows
 * below once there are retries; `showAttempts={false}` hides it, e.g. on the
 * student's screen where it isn't useful. Place it in
 * `Card` → `CardContent className="p-0"`, or a dialog with `className="p-0"`.
 */
function RecordingUploadingPanel({
  title = "Uploading recording",
  attempt = 1,
  totalAttempts = 1,
  showAttempts = true,
  className,
}: {
  title?: string
  attempt?: number
  totalAttempts?: number
  /** Show the retry progress bar and "Attempt N of M" once there are retries */
  showAttempts?: boolean
  className?: string
}) {
  return (
    <Empty
      data-slot="recording-uploading-panel"
      role="status"
      className={cn("p-4", className)}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          Please keep this page open while your recording uploads.
        </EmptyDescription>
      </EmptyHeader>
      {showAttempts && totalAttempts > 1 && (
        <EmptyContent className="max-w-xs gap-1.5">
          <Progress
            value={(attempt / totalAttempts) * 100}
            aria-label={`Upload attempt ${attempt} of ${totalAttempts}`}
          />
          <p className="text-xs text-muted-foreground tabular-nums">
            Attempt {attempt} of {totalAttempts}
          </p>
        </EmptyContent>
      )}
    </Empty>
  )
}

/**
 * Upload finished, laid out like an empty state: success icon, title, an
 * optional note, then the saved recording's details and a next action.
 */
function RecordingDonePanel({
  title = "Recording saved",
  name,
  durationSeconds,
  sizeBytes,
  note,
  actionLabel = "New recording",
  actionVariant = "default",
  onAction,
  className,
}: {
  title?: string
  name: string
  durationSeconds: number
  sizeBytes: number
  /** Line under the title, e.g. where to find the recording */
  note?: string
  actionLabel?: string
  /** Use "outline" when the action is a fallback you don't want to promote */
  actionVariant?: Extract<
    React.ComponentProps<typeof Button>["variant"],
    "default" | "outline"
  >
  onAction?: () => void
  className?: string
}) {
  return (
    <Empty data-slot="recording-done-panel" className={cn("p-4", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-success/10 text-success">
          <CheckCircle2Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {note && <EmptyDescription>{note}</EmptyDescription>}
      </EmptyHeader>
      <EmptyContent>
        <DetailList
          className="w-full"
          items={[
            { label: "Name", value: name },
            { label: "Duration", value: formatDuration(durationSeconds) },
            { label: "Size", value: formatBytes(sizeBytes) },
          ]}
        />
        <Button variant={actionVariant} onClick={onAction}>
          {actionLabel}
        </Button>
      </EmptyContent>
    </Empty>
  )
}

/**
 * Upload failed, laid out like an empty state. Retrying the upload keeps the
 * recording. `onDiscard` adds a "Discard" button that confirms first, since
 * the recording is lost; `onRetryFlow` adds an unconfirmed "Start over" for
 * flows where starting again keeps nothing to lose. Mic-permission failures
 * use MicPermissionError instead.
 */
function UploadErrorPanel({
  title = "Upload failed",
  message = "We couldn't upload your recording.",
  onRetryUpload,
  onRetryFlow,
  onDiscard,
  className,
}: {
  title?: string
  message?: string
  onRetryUpload?: () => void
  onRetryFlow?: () => void
  /** Throws the recording away, after a confirmation */
  onDiscard?: () => void
  className?: string
}) {
  return (
    <Empty
      data-slot="upload-error-panel"
      role="alert"
      className={cn("p-4", className)}
    >
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="bg-destructive/10 text-destructive"
        >
          <XCircleIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      {(onDiscard || onRetryFlow || onRetryUpload) && (
        <EmptyContent className="flex-row justify-center gap-2">
          {onDiscard && (
            <ConfirmDialog
              trigger={<Button variant="outline">Discard</Button>}
              title="Discard this recording?"
              description="It hasn't been uploaded yet, so it will be lost. This cannot be undone."
              confirmLabel="Discard"
              onConfirm={onDiscard}
            />
          )}
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
        </EmptyContent>
      )}
    </Empty>
  )
}

export {
  RecordingReadyPanel,
  RecordingUploadingPanel,
  RecordingDonePanel,
  UploadErrorPanel,
}
