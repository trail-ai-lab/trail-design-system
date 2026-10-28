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
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { isNameTaken } from "@/components/slai/lib/name-key"

/**
 * Rename prompt for a class, session or source. Pass `extension` (e.g.
 * ".mp3") to keep a source's file extension fixed: it shows as a suffix and
 * is excluded from the editable name. Pass `takenNames` (e.g. the other
 * classes' names) to refuse a name already in use, ignoring case and spacing.
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
  takenNames,
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
  /** Names the new name may not match; don't include `currentName` */
  takenNames?: readonly string[]
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
          takenNames={takenNames}
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
  takenNames = [],
  loading,
  onCancel,
  onSubmit,
}: {
  currentName: string
  extension?: string
  takenNames?: readonly string[]
  loading: boolean
  onCancel: () => void
  onSubmit: (name: string) => void
}) {
  const [name, setName] = React.useState(currentName)
  const errorId = React.useId()
  const trimmed = name.trim()
  const taken = isNameTaken(`${trimmed}${extension ?? ""}`, takenNames)
  const canSubmit =
    trimmed.length > 0 && trimmed !== currentName && !taken && !loading

  const submit = () => {
    if (canSubmit) onSubmit(`${trimmed}${extension ?? ""}`)
  }

  return (
    <>
      <Field data-invalid={taken || undefined}>
        <div className="flex items-center gap-2">
          <Input
            aria-label="Name"
            aria-invalid={taken || undefined}
            aria-describedby={taken ? errorId : undefined}
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
        {taken && (
          <FieldError id={errorId}>That name is already in use.</FieldError>
        )}
      </Field>
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
