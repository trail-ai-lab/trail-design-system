"use client"

import * as React from "react"

import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
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
import type {
  RosterStudentFields,
  RosterTableStudent,
} from "@/components/slai/lib/roster"

/**
 * Edits a roster student: display name, other spellings (aliases — names
 * typed on devices or given to speakers that should link to them), primary
 * language, grade and whether they're a native English speaker.
 */
function EditStudentDialog({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  student,
  loading = false,
  onSubmit,
}: {
  /** Element that opens the dialog; omit when controlling `open` yourself */
  trigger?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** The student being edited; the form starts from their fields */
  student: RosterTableStudent | null
  loading?: boolean
  onSubmit: (fields: RosterStudentFields) => void
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit student</DialogTitle>
        </DialogHeader>
        {open && student && (
          <EditStudentForm
            key={student.id}
            student={student}
            loading={loading}
            onCancel={() => setOpen(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EditStudentForm({
  student,
  loading,
  onCancel,
  onSubmit,
}: {
  student: RosterTableStudent
  loading: boolean
  onCancel: () => void
  onSubmit: (fields: RosterStudentFields) => void
}) {
  const uid = React.useId()
  const [name, setName] = React.useState(student.name)
  const [aliases, setAliases] = React.useState(
    (student.aliases ?? []).join(", ")
  )
  const [language, setLanguage] = React.useState(student.language ?? "")
  const [grade, setGrade] = React.useState(student.grade ?? "")
  const [nativeEnglish, setNativeEnglish] = React.useState(
    Boolean(student.isNativeEnglish)
  )
  const canSubmit = name.trim().length > 0 && !loading

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        if (!canSubmit) return
        onSubmit({
          name: name.trim(),
          aliases: aliases
            .split(",")
            .map((alias) => alias.trim())
            .filter(Boolean),
          language: language.trim() || undefined,
          grade: grade.trim() || undefined,
          isNativeEnglish: nativeEnglish,
        })
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${uid}-name`}>Name</FieldLabel>
          <Input
            id={`${uid}-name`}
            required
            maxLength={80}
            value={name}
            disabled={loading}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${uid}-aliases`}>
            Other spellings
            <span className="font-normal text-muted-foreground">
              — optional
            </span>
          </FieldLabel>
          <Input
            id={`${uid}-aliases`}
            value={aliases}
            disabled={loading}
            placeholder="e.g., Meimei, Mei L."
            onChange={(event) => setAliases(event.target.value)}
          />
          <FieldDescription>
            Comma-separated. Names students type when they join link to this
            student.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor={`${uid}-language`}>
              Language
              <span className="font-normal text-muted-foreground">
                — optional
              </span>
            </FieldLabel>
            <Input
              id={`${uid}-language`}
              maxLength={40}
              value={language}
              disabled={loading}
              onChange={(event) => setLanguage(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${uid}-grade`}>
              Grade
              <span className="font-normal text-muted-foreground">
                — optional
              </span>
            </FieldLabel>
            <Input
              id={`${uid}-grade`}
              maxLength={16}
              value={grade}
              disabled={loading}
              onChange={(event) => setGrade(event.target.value)}
            />
          </Field>
        </div>
        <Field orientation="horizontal">
          <Checkbox
            id={`${uid}-native`}
            checked={nativeEnglish}
            disabled={loading}
            onCheckedChange={(checked) => setNativeEnglish(checked === true)}
          />
          <FieldLabel htmlFor={`${uid}-native`}>
            Native English speaker
          </FieldLabel>
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
          {loading ? "Saving…" : "Save"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export { EditStudentDialog }
