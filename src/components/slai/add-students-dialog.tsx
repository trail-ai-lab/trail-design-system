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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { parseRoster, type RosterImportRow } from "@/components/slai/lib/roster"

/**
 * Adds students to a class roster: one name per line, or a CSV with a name
 * column (and optional language and grade columns), pasted or chosen as a
 * file. Shows how many students it found; `onSubmit` receives them parsed.
 * Names already on the roster are for the app to skip.
 */
function AddStudentsDialog({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  klass,
  loading = false,
  onSubmit,
}: {
  /** Element that opens the dialog; omit when controlling `open` yourself */
  trigger?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** The class's name, used in the description, e.g. "Physics" */
  klass?: string
  loading?: boolean
  onSubmit: (students: RosterImportRow[]) => void
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add students</DialogTitle>
          <DialogDescription>
            Add students to {klass ?? "this class"}: one name per line, or a CSV
            with a name column (language and grade are optional). First names
            are enough.
          </DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so it starts empty each time. */}
        {open && (
          <AddStudentsForm
            loading={loading}
            onCancel={() => setOpen(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function AddStudentsForm({
  loading,
  onCancel,
  onSubmit,
}: {
  loading: boolean
  onCancel: () => void
  onSubmit: (students: RosterImportRow[]) => void
}) {
  const uid = React.useId()
  const [text, setText] = React.useState("")
  const students = React.useMemo(() => parseRoster(text), [text])
  const canSubmit = students.length > 0 && !loading

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        if (canSubmit) onSubmit(students)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${uid}-names`}>Names</FieldLabel>
          <Textarea
            id={`${uid}-names`}
            rows={8}
            value={text}
            disabled={loading}
            placeholder={"Mei\nLiam\nRosa"}
            onChange={(event) => setText(event.target.value)}
          />
          <FieldDescription aria-live="polite">
            {students.length > 0
              ? `${students.length} ${students.length === 1 ? "student" : "students"} found`
              : "Paste names, or choose a CSV file."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${uid}-file`}>
            CSV file
            <span className="font-normal text-muted-foreground">
              — optional
            </span>
          </FieldLabel>
          <Input
            id={`${uid}-file`}
            type="file"
            accept=".csv,.tsv,.txt,text/csv,text/plain"
            disabled={loading}
            onChange={async (event) => {
              const file = event.target.files?.[0]
              if (file) setText(await file.text())
            }}
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          {loading && <Spinner data-icon="inline-start" />}
          {loading
            ? "Adding…"
            : students.length > 0
              ? `Add ${students.length} ${students.length === 1 ? "student" : "students"}`
              : "Add students"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export { AddStudentsDialog }
