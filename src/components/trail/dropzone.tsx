"use client"

import * as React from "react"
import { UploadCloudIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DropzoneProps {
  /** Called with the accepted files (a single file unless `multiple`) */
  onFilesSelected: (files: File[]) => void
  /** Native `accept` string, e.g. "application/pdf,audio/*" */
  accept?: string
  multiple?: boolean
  disabled?: boolean
  title?: string
  description?: string
  className?: string
}

/**
 * Drag-and-drop file target that also opens the native file picker on click
 * or keyboard activation. It only reports files — the selected-file and
 * upload states belong to the consuming form.
 */
function Dropzone({
  onFilesSelected,
  accept,
  multiple = false,
  disabled = false,
  title = "Drag and drop a file or click to browse",
  description,
  className,
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const emit = (list: FileList | null) => {
    if (!list || list.length === 0) return
    const files = Array.from(list)
    onFilesSelected(multiple ? files : files.slice(0, 1))
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      data-slot="dropzone"
      data-dragging={isDragging || undefined}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        if (!disabled) emit(e.dataTransfer.files)
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-6 py-10 text-center transition-colors outline-none hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 data-[dragging]:border-primary data-[dragging]:bg-primary/5 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className
      )}
    >
      <UploadCloudIcon className="size-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          emit(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}

export { Dropzone }
