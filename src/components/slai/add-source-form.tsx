"use client"

import * as React from "react"
import { UploadIcon } from "lucide-react"

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
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { Dropzone } from "@/components/patterns/dropzone"
import {
  FileUploadItem,
  type UploadStatus,
} from "@/components/patterns/file-upload-item"
import { SectionLabel } from "@/components/patterns/section-label"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"
import type { LanguageOptions } from "@/components/slai/lib/language-option"
import {
  SessionDestinationFields,
  type DestinationClass,
  type SessionDestination,
} from "@/components/slai/session-destination-fields"

/** One file's upload state in `multiple` mode, by its position in the list. */
export interface AddSourceFileState {
  status: UploadStatus
  /** 0–100 while `uploading` */
  progress?: number
  /** Why it failed */
  error?: string
}

/** A file to upload in `multiple` mode; `name` is empty to keep the file's own name. */
export interface AddSourceUpload {
  file: File
  name: string
}

/**
 * "Add recording" card: drop an audio file, optionally rename it and set the
 * languages spoken, then upload. With `multiple`, several files at once, and
 * (given `classes`) the choice to keep them as separate recordings or put
 * them in a new or existing session, each recording as its own group.
 */
function AddSourceForm({
  languageOptions,
  accept = "audio/*",
  loading: loadingProp,
  uploading: uploadingProp,
  progress,
  onUpload,
  multiple = false,
  classes,
  fileStates,
  onUploadMany,
  onRetry,
  className,
}: {
  /** Languages to offer; `{ value, label }` pairs report values */
  languageOptions: LanguageOptions
  accept?: string
  /** The upload is in flight */
  loading?: boolean
  /** @deprecated Use `loading`. */
  uploading?: boolean
  /** Upload progress, 0–100, shown on the file while `loading` */
  progress?: number
  /** `name` is empty when the user kept the original file name */
  onUpload?: (
    file: File,
    options: { name: string; languages: string[] }
  ) => void
  /** Pick several files; reports them through `onUploadMany` */
  multiple?: boolean
  /** In `multiple` mode, offers "A session" as a destination with these classes and sessions */
  classes?: DestinationClass[]
  /** In `multiple` mode, each file's upload state, in the order reported */
  fileStates?: (AddSourceFileState | undefined)[]
  /** `multiple` mode's submit; `destination` is `null` for separate recordings */
  onUploadMany?: (
    uploads: AddSourceUpload[],
    options: { languages: string[]; destination: SessionDestination | null }
  ) => void
  /** In `multiple` mode, retry a failed file (by index) */
  onRetry?: (index: number) => void
  className?: string
}) {
  if (multiple) {
    return (
      <MultipleSourcesForm
        languageOptions={languageOptions}
        accept={accept}
        loading={loadingProp ?? uploadingProp ?? false}
        classes={classes}
        fileStates={fileStates}
        onUploadMany={onUploadMany}
        onRetry={onRetry}
        className={className}
      />
    )
  }
  return (
    <SingleSourceForm
      languageOptions={languageOptions}
      accept={accept}
      loading={loadingProp ?? uploadingProp ?? false}
      progress={progress}
      onUpload={onUpload}
      className={className}
    />
  )
}

function SingleSourceForm({
  languageOptions,
  accept,
  loading: uploading,
  progress,
  onUpload,
  className,
}: {
  languageOptions: LanguageOptions
  accept: string
  loading: boolean
  progress?: number
  onUpload?: (
    file: File,
    options: { name: string; languages: string[] }
  ) => void
  className?: string
}) {
  const uid = React.useId()
  const [file, setFile] = React.useState<File | null>(null)
  const [name, setName] = React.useState("")
  const [languages, setLanguages] = React.useState<string[]>([])

  return (
    <Card data-slot="add-source-form" className={className}>
      <CardHeader>
        <CardTitle>Add recording</CardTitle>
        <CardDescription>
          Upload an audio recording to review and ask questions about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {file ? (
          <FieldGroup>
            <FileUploadItem
              name={file.name}
              size={file.size}
              status={uploading ? "uploading" : undefined}
              progress={uploading ? progress : undefined}
              disabled={uploading}
              onRemove={() => setFile(null)}
            />
            <Field>
              <FieldLabel htmlFor={`${uid}-source-name`}>
                Name
                <span className="font-normal text-muted-foreground">
                  — optional
                </span>
              </FieldLabel>
              <Input
                id={`${uid}-source-name`}
                placeholder={file.name}
                value={name}
                disabled={uploading}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${uid}-source-languages`}>
                Languages spoken
                <span className="font-normal text-muted-foreground">
                  — optional
                </span>
              </FieldLabel>
              <LanguageMultiSelect
                id={`${uid}-source-languages`}
                options={languageOptions}
                value={languages}
                onValueChange={setLanguages}
                disabled={uploading}
                helperText="Helps transcription accuracy."
              />
            </Field>
          </FieldGroup>
        ) : (
          <Dropzone
            accept={accept}
            description="Audio files"
            onFilesSelected={([selected]) => setFile(selected)}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!file || uploading}
          onClick={() =>
            file && onUpload?.(file, { name: name.trim(), languages })
          }
        >
          {uploading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <UploadIcon data-icon="inline-start" />
          )}
          {uploading ? "Uploading…" : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function MultipleSourcesForm({
  languageOptions,
  accept,
  loading,
  classes,
  fileStates,
  onUploadMany,
  onRetry,
  className,
}: {
  languageOptions: LanguageOptions
  accept: string
  loading: boolean
  classes?: DestinationClass[]
  fileStates?: (AddSourceFileState | undefined)[]
  onUploadMany?: (
    uploads: AddSourceUpload[],
    options: { languages: string[]; destination: SessionDestination | null }
  ) => void
  onRetry?: (index: number) => void
  className?: string
}) {
  const uid = React.useId()
  const [uploads, setUploads] = React.useState<AddSourceUpload[]>([])
  const [languages, setLanguages] = React.useState<string[]>([])
  const [target, setTarget] = React.useState<"recordings" | "session">(
    "recordings"
  )
  const [destination, setDestination] =
    React.useState<SessionDestination | null>(null)
  // Once any file has a state, the list is fixed until the consumer moves on.
  const started = loading || (fileStates?.some(Boolean) ?? false)
  const toSession = !!classes && target === "session"
  const canUpload =
    uploads.length > 0 && !started && (!toSession || destination !== null)
  const count = uploads.length

  const addFiles = (files: File[]) =>
    setUploads((current) => [
      ...current,
      ...files.map((file) => ({ file, name: "" })),
    ])

  return (
    <Card data-slot="add-source-form" className={className}>
      <CardHeader>
        <CardTitle>Add recordings</CardTitle>
        <CardDescription>
          Upload audio recordings to review and ask questions about, on their
          own or together as a session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <SectionLabel asChild>
              <legend className="mb-3">Recordings</legend>
            </SectionLabel>
            <div className="flex flex-col gap-3">
              {uploads.map((upload, index) => {
                const state = fileStates?.[index]
                return (
                  <div
                    key={`${upload.file.name}-${index}`}
                    className="flex flex-col gap-2"
                  >
                    <FileUploadItem
                      name={upload.file.name}
                      size={upload.file.size}
                      status={state?.status}
                      progress={state?.progress}
                      error={state?.error}
                      disabled={loading}
                      onRetry={onRetry ? () => onRetry(index) : undefined}
                      onRemove={
                        started
                          ? undefined
                          : () =>
                              setUploads((current) =>
                                current.filter((_, i) => i !== index)
                              )
                      }
                    />
                    {!started && (
                      <Input
                        aria-label={`Name for ${upload.file.name} — optional`}
                        placeholder={upload.file.name}
                        value={upload.name}
                        onChange={(event) =>
                          setUploads((current) =>
                            current.map((u, i) =>
                              i === index
                                ? { ...u, name: event.target.value }
                                : u
                            )
                          )
                        }
                      />
                    )}
                  </div>
                )
              })}
              {!started && (
                <Dropzone
                  accept={accept}
                  multiple
                  title={
                    count
                      ? "Add more files"
                      : "Drag and drop files or click to browse"
                  }
                  description="Audio files"
                  onFilesSelected={addFiles}
                />
              )}
            </div>
          </FieldSet>

          <Field>
            <FieldLabel htmlFor={`${uid}-languages`}>
              Languages spoken
              <span className="font-normal text-muted-foreground">
                — optional
              </span>
            </FieldLabel>
            <LanguageMultiSelect
              id={`${uid}-languages`}
              options={languageOptions}
              value={languages}
              onValueChange={setLanguages}
              disabled={started}
              helperText="Applies to every recording. Helps transcription accuracy."
            />
          </Field>

          {classes && (
            <FieldSet>
              <SectionLabel asChild>
                <legend className="mb-3">Save to</legend>
              </SectionLabel>
              <RadioGroup
                value={target}
                onValueChange={(next) =>
                  setTarget(next as "recordings" | "session")
                }
                disabled={started}
                aria-label="Save to"
                className="grid gap-3 sm:grid-cols-2"
              >
                <FieldLabel htmlFor={`${uid}-to-recordings`}>
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="recordings"
                      id={`${uid}-to-recordings`}
                      aria-labelledby={`${uid}-to-recordings-title`}
                    />
                    <FieldContent>
                      <FieldTitle id={`${uid}-to-recordings-title`}>
                        Separate recordings
                      </FieldTitle>
                      <FieldDescription>
                        Each file is reviewed on its own.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor={`${uid}-to-session`}>
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="session"
                      id={`${uid}-to-session`}
                      aria-labelledby={`${uid}-to-session-title`}
                    />
                    <FieldContent>
                      <FieldTitle id={`${uid}-to-session-title`}>
                        A session
                      </FieldTitle>
                      <FieldDescription>
                        Each file becomes a group, named after it.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </RadioGroup>
              {toSession && (
                <SessionDestinationFields
                  className="mt-4"
                  classes={classes}
                  dateDescription="Leave empty to use the upload time."
                  disabled={started}
                  onValueChange={setDestination}
                />
              )}
            </FieldSet>
          )}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!canUpload}
          onClick={() =>
            onUploadMany?.(
              uploads.map((u) => ({ file: u.file, name: u.name.trim() })),
              { languages, destination: toSession ? destination : null }
            )
          }
        >
          {loading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <UploadIcon data-icon="inline-start" />
          )}
          {loading
            ? "Uploading…"
            : count > 1
              ? `Upload ${count} recordings`
              : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { AddSourceForm }
