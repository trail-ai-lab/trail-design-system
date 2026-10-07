"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/**
 * Rename prompt for a class, session or source. Pass `extension` (e.g.
 * ".mp3") to keep a source's file extension fixed: it shows as a suffix and
 * is excluded from the editable name.
 */
function RenameDialog({
  open,
  onOpenChange,
  title = "Rename",
  description,
  currentName,
  extension,
  loading = false,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  currentName: string
  extension?: string
  loading?: boolean
  /** Receives the new name, with `extension` re-appended when set */
  onSubmit: (name: string) => void
}) {
  const [name, setName] = React.useState(currentName)

  React.useEffect(() => {
    if (open) setName(currentName)
  }, [open, currentName])

  const trimmed = name.trim()
  const canSubmit = trimmed.length > 0 && trimmed !== currentName && !loading

  const submit = () => {
    if (canSubmit) onSubmit(`${trimmed}${extension ?? ""}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            autoFocus
            aria-label="Name"
            value={name}
            disabled={loading}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit()
            }}
          />
          {extension && (
            <span className="text-sm text-muted-foreground">{extension}</span>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button disabled={!canSubmit} onClick={submit}>
            {loading && <Spinner data-icon="inline-start" />}
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { RenameDialog }
