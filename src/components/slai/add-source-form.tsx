"use client"

import * as React from "react"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Dropzone } from "@/components/trail/dropzone"
import { formatBytes } from "@/components/slai/lib/format"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"

/**
 * "Add source" card: drop a PDF or audio file, optionally rename it and set
 * the languages spoken, then upload.
 */
function AddSourceForm({
  languageOptions,
  accept = "application/pdf,audio/*",
  uploading = false,
  onUpload,
  className,
}: {
  languageOptions: string[]
  accept?: string
  uploading?: boolean
  /** `name` is empty when the user kept the original file name */
  onUpload?: (file: File, options: { name: string; languages: string[] }) => void
  className?: string
}) {
  const [file, setFile] = React.useState<File | null>(null)
  const [name, setName] = React.useState("")
  const [languages, setLanguages] = React.useState<string[]>([])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Add source</CardTitle>
        <CardDescription>
          Upload a PDF or audio recording to review and ask questions about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {file ? (
          <FieldGroup>
            <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
              <FileIcon className="size-5 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {formatBytes(file.size)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Remove file"
                disabled={uploading}
                onClick={() => setFile(null)}
              >
                <XIcon />
              </Button>
            </div>
            <Field>
              <FieldLabel htmlFor="slai-source-name">
                Rename
                <span className="font-normal text-muted-foreground">
                  — optional
                </span>
              </FieldLabel>
              <Input
                id="slai-source-name"
                placeholder={file.name}
                value={name}
                disabled={uploading}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="slai-source-languages">
                Languages spoken
                <span className="font-normal text-muted-foreground">
                  — optional
                </span>
              </FieldLabel>
              <LanguageMultiSelect
                id="slai-source-languages"
                options={languageOptions}
                value={languages}
                onChange={setLanguages}
                disabled={uploading}
                helperText="Helps transcription accuracy."
              />
            </Field>
          </FieldGroup>
        ) : (
          <Dropzone
            accept={accept}
            description="PDF or audio files"
            onFilesSelected={([selected]) => setFile(selected)}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!file || uploading}
          onClick={() => file && onUpload?.(file, { name: name.trim(), languages })}
        >
          {uploading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <UploadIcon data-icon="inline-start" />
          )}
          {uploading ? "Uploading..." : file ? "Upload" : "No file selected"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { AddSourceForm }
