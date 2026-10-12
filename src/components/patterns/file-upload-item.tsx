"use client"

import * as React from "react"
import { CheckIcon, FileIcon, RotateCwIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatBytes } from "@/lib/format"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import {
  StatusBadge,
  type StatusTone,
} from "@/components/patterns/status-badge"

/**
 * Where an uploaded file is:
 * - `uploading` — bytes are being sent (pair with `progress`)
 * - `processing` — uploaded; the server is preparing it (e.g. indexing)
 * - `ready` — usable
 * - `failed` — upload or processing failed; offer a retry
 */
export type UploadStatus = "uploading" | "processing" | "ready" | "failed"

const statusConfig: Record<
  UploadStatus,
  {
    label: string
    tone: StatusTone
    icon: React.ComponentType<React.ComponentProps<"svg">>
  }
> = {
  uploading: { label: "Uploading", tone: "muted", icon: Spinner },
  processing: { label: "Processing", tone: "info", icon: Spinner },
  ready: { label: "Ready", tone: "success", icon: CheckIcon },
  failed: { label: "Failed", tone: "destructive", icon: XIcon },
}

/** Upload status as a tinted pill: "Processing", "Ready", "Failed"…; `children` follow the label (e.g. "45%"). */
function UploadStatusBadge({
  status,
  className,
  children,
}: {
  status: UploadStatus
  className?: string
  children?: React.ReactNode
}) {
  const config = statusConfig[status]
  return (
    <StatusBadge
      tone={config.tone}
      icon={config.icon}
      data-slot="upload-status-badge"
      className={className}
    >
      {config.label}
      {children}
    </StatusBadge>
  )
}

/**
 * One file in an upload form or queue: icon, name, size, and — when `status`
 * is set — a progress bar while uploading and a status badge under the name
 * after. Without
 * `status` it's a plain selected file with a remove button.
 */
function FileUploadItem({
  name,
  size,
  status,
  progress,
  error,
  icon: Icon = FileIcon,
  disabled = false,
  onRemove,
  onRetry,
  className,
}: {
  name: string
  /** File size in bytes */
  size?: number
  status?: UploadStatus
  /** 0–100 while `uploading`; the bar is indeterminate-looking at 0 */
  progress?: number
  /** Why it failed, shown in place of the size */
  error?: string
  /** File-type icon; defaults to a generic file */
  icon?: React.ComponentType<React.ComponentProps<"svg">>
  disabled?: boolean
  /** Shows a remove (×) button */
  onRemove?: () => void
  /** Shows a retry button while `failed` */
  onRetry?: () => void
  className?: string
}) {
  const meta = [
    size !== undefined ? formatBytes(size) : undefined,
    status === "uploading" && progress !== undefined
      ? `${Math.round(progress)}%`
      : undefined,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <Item
      variant="outline"
      size="sm"
      data-slot="file-upload-item"
      data-status={status}
      className={cn("flex-nowrap", className)}
    >
      <ItemMedia variant="icon">
        <Icon className="text-muted-foreground" />
      </ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle className="w-full truncate">{name}</ItemTitle>
        {(meta || (status && status !== "uploading")) && (
          <div className="flex min-w-0 items-center gap-2">
            {status && status !== "uploading" && (
              <UploadStatusBadge status={status} className="shrink-0" />
            )}
            {meta && (
              <ItemDescription className="truncate tabular-nums">
                {meta}
              </ItemDescription>
            )}
          </div>
        )}
        {status === "failed" && error && (
          <ItemDescription className="text-destructive">
            {error}
          </ItemDescription>
        )}
        {status === "uploading" && (
          <Progress
            value={progress ?? 0}
            aria-label={`Uploading ${name}`}
            className="mt-1 h-1"
          />
        )}
      </ItemContent>
      <ItemActions>
        {status === "failed" && onRetry && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Retry ${name}`}
            disabled={disabled}
            onClick={onRetry}
          >
            <RotateCwIcon />
          </Button>
        )}
        {onRemove && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove ${name}`}
            disabled={disabled}
            onClick={onRemove}
          >
            <XIcon />
          </Button>
        )}
      </ItemActions>
    </Item>
  )
}

export { FileUploadItem, UploadStatusBadge }
