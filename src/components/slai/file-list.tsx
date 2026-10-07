import {
  FileAudioIcon,
  FileIcon,
  FileTextIcon,
  FileVideoIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface UploadedFile {
  id: string
  name: string
  /** Formatted size, e.g. "4.2 MB" */
  sizeLabel: string
}

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  if (["mp3", "m4a", "wav"].includes(ext)) return FileAudioIcon
  if (["webm", "mp4", "mov"].includes(ext)) return FileVideoIcon
  if (["pdf", "doc", "docx", "pages", "rtf", "txt"].includes(ext))
    return FileTextIcon
  return FileIcon
}

/** Files queued for upload, each with a type icon, size and a remove button. */
function FileList({
  files,
  onRemove,
  className,
}: {
  files: UploadedFile[]
  onRemove?: (id: string) => void
  className?: string
}) {
  if (files.length === 0) return null
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {files.map((file) => {
        const Icon = iconFor(file.name)
        return (
          <li
            key={file.id}
            className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2"
          >
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {file.sizeLabel}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${file.name}`}
              onClick={() => onRemove?.(file.id)}
            >
              <XIcon />
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export { FileList }
