"use client"

import * as React from "react"

import { useControllableState } from "@/lib/use-controllable-state"
import { cn } from "@/lib/utils"

import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { isNameTaken } from "@/components/slai/lib/name-key"

/**
 * Creates a class before its first session, so a teacher can add the roster
 * and course materials ahead of time. Pass `takenNames` (the teacher's classes)
 * to refuse a name already in use, ignoring case and spacing.
 */
function NewClassDialog({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  takenNames,
  loading = false,
  error,
  onSubmit,
  className,
}: {
  /** Element that opens the dialog; omit when controlling `open` yourself */
  trigger?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Names the new class may not use */
  takenNames?: readonly string[]
  loading?: boolean
  /** Why creating the class failed */
  error?: string
  /** Receives the trimmed class name */
  onSubmit: (name: string) => void
  className?: string
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        data-slot="new-class-dialog"
        className={cn("sm:max-w-sm", className)}
      >
        <DialogHeader>
          <DialogTitle>New class</DialogTitle>
          <DialogDescription>
            Add your roster and course materials before the first session.
          </DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so the name starts empty each time. */}
        <NewClassForm
          takenNames={takenNames}
          loading={loading}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

function NewClassForm({
  takenNames = [],
  loading,
  error,
  onCancel,
  onSubmit,
}: {
  takenNames?: readonly string[]
  loading: boolean
  error?: string
  onCancel: () => void
  onSubmit: (name: string) => void
}) {
  const [name, setName] = React.useState("")
  const inputId = React.useId()
  const errorId = React.useId()
  const trimmed = name.trim()
  const taken = isNameTaken(trimmed, takenNames)
  const canSubmit = trimmed.length > 0 && !taken && !loading

  const submit = () => {
    if (canSubmit) onSubmit(trimmed)
  }

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Field data-invalid={taken || undefined}>
        <FieldLabel htmlFor={inputId}>Class name</FieldLabel>
        <Input
          id={inputId}
          placeholder="e.g. Physics"
          aria-invalid={taken || undefined}
          aria-describedby={taken ? errorId : undefined}
          value={name}
          disabled={loading}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit()
          }}
        />
        {taken && (
          <FieldError id={errorId}>This class already exists.</FieldError>
        )}
      </Field>
      <DialogFooter>
        <Button variant="outline" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!canSubmit} onClick={submit}>
          {loading && <Spinner data-icon="inline-start" />}
          {loading ? "Creating…" : "Create class"}
        </Button>
      </DialogFooter>
    </>
  )
}

export { NewClassDialog }
