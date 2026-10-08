"use client"

import * as React from "react"

import { useControllableState } from "@/lib/use-controllable-state"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/**
 * Rename prompt for a class, session or source. Pass `extension` (e.g.
 * ".mp3") to keep a source's file extension fixed: it shows as a suffix and
 * is excluded from the editable name.
 */
function RenameDialog({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  title = "Rename",
  description,
  currentName,
  extension,
  loading = false,
  onSubmit,
}: {
  /** Element that opens the dialog; omit when controlling `open` yourself */
  trigger?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  currentName: string
  extension?: string
  loading?: boolean
  /** Receives the new name, with `extension` re-appended when set */
  onSubmit: (name: string) => void
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {/* Mounted only while open, so the draft starts from currentName each time. */}
        <RenameForm
          key={currentName}
          currentName={currentName}
          extension={extension}
          loading={loading}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

function RenameForm({
  currentName,
  extension,
  loading,
  onCancel,
  onSubmit,
}: {
  currentName: string
  extension?: string
  loading: boolean
  onCancel: () => void
  onSubmit: (name: string) => void
}) {
  const [name, setName] = React.useState(currentName)
  const trimmed = name.trim()
  const canSubmit = trimmed.length > 0 && trimmed !== currentName && !loading

  const submit = () => {
    if (canSubmit) onSubmit(`${trimmed}${extension ?? ""}`)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
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
        <Button variant="outline" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!canSubmit} onClick={submit}>
          {loading && <Spinner data-icon="inline-start" />}
          {loading ? "Saving…" : "Save"}
        </Button>
      </DialogFooter>
    </>
  )
}

export { RenameDialog }
