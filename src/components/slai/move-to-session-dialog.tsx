"use client"

import * as React from "react"

import { useControllableState } from "@/lib/use-controllable-state"
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  SessionDestinationFields,
  type DestinationClass,
  type SessionDestination,
} from "@/components/slai/session-destination-fields"

/**
 * "Move to session" prompt for a saved recording: pick an existing class or
 * a new one, then an existing session or a new one (with an optional date).
 * The recording becomes its own group in that session, named `groupName`.
 */
function MoveToSessionDialog({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  recordingName,
  classes,
  defaultSessionDate = null,
  loading = false,
  error,
  onSubmit,
}: {
  /** Element that opens the dialog; omit when controlling `open` yourself */
  trigger?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** The recording being moved; also the group name's default */
  recordingName: string
  /** Classes and the sessions a recording can join (leave running sessions out) */
  classes: DestinationClass[]
  /** Pre-fills a new session's date, e.g. when the recording was made */
  defaultSessionDate?: Date | null
  loading?: boolean
  /** Why the last move failed, shown above the buttons */
  error?: string
  onSubmit?: (move: SessionDestination & { groupName: string }) => void
}) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent data-slot="move-to-session-dialog" className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Move to session</DialogTitle>
          <DialogDescription>
            &ldquo;{recordingName}&rdquo; becomes its own group in the session
            you pick.
          </DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so each opening starts fresh. */}
        <MoveForm
          key={recordingName}
          recordingName={recordingName}
          classes={classes}
          defaultSessionDate={defaultSessionDate}
          loading={loading}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

function MoveForm({
  recordingName,
  classes,
  defaultSessionDate,
  loading,
  error,
  onCancel,
  onSubmit,
}: {
  recordingName: string
  classes: DestinationClass[]
  defaultSessionDate: Date | null
  loading: boolean
  error?: string
  onCancel: () => void
  onSubmit?: (move: SessionDestination & { groupName: string }) => void
}) {
  const uid = React.useId()
  const [destination, setDestination] =
    React.useState<SessionDestination | null>(null)
  const [groupName, setGroupName] = React.useState(recordingName)
  const trimmedGroup = groupName.trim()
  const canSubmit = !!destination && trimmedGroup.length > 0 && !loading

  return (
    <>
      <FieldGroup className="gap-4">
        <SessionDestinationFields
          classes={classes}
          defaultSessionDate={defaultSessionDate}
          dateDescription="Defaults to when the recording was made."
          disabled={loading}
          onValueChange={setDestination}
        />
        <Field>
          <FieldLabel htmlFor={`${uid}-group`}>Group name</FieldLabel>
          <Input
            id={`${uid}-group`}
            value={groupName}
            disabled={loading}
            onChange={(event) => setGroupName(event.target.value)}
          />
        </Field>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </FieldGroup>
      <DialogFooter>
        <Button variant="outline" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          disabled={!canSubmit}
          onClick={() =>
            destination &&
            onSubmit?.({ ...destination, groupName: trimmedGroup })
          }
        >
          {loading && <Spinner data-icon="inline-start" />}
          {loading ? "Moving…" : "Move"}
        </Button>
      </DialogFooter>
    </>
  )
}

export { MoveToSessionDialog }
