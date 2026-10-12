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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Dropzone } from "@/components/patterns/dropzone"
import { FileUploadItem } from "@/components/patterns/file-upload-item"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"
import type { LanguageOptions } from "@/components/slai/lib/language-option"

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
  /** Languages to offer; `{ value, label }` pairs report values */
  languageOptions: LanguageOptions
  accept?: string
  uploading?: boolean
  /** `name` is empty when the user kept the original file name */
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
            <FileUploadItem
              name={file.name}
              size={file.size}
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
            description="PDF or audio files"
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

export { AddSourceForm }
