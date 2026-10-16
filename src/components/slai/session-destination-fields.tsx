"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateTimePicker } from "@/components/patterns/date-time-picker"
import { cn } from "@/lib/utils"

const NEW = "__new__"

/** A class recordings can be put in, with the sessions they can join. */
export interface DestinationClass {
  id: string
  name: string
  /** Sessions a recording can be added to (ended ones; leave running sessions out) */
  sessions: { id: string; name: string }[]
}

/**
 * Where recordings go: an existing class (`classId`) or a new one
 * (`className` only), and an existing session (`sessionId`) or a new one
 * (`sessionName`, with `sessionDate` when the teacher picked one).
 */
export interface SessionDestination {
  /** Unset for a new class */
  classId?: string
  className: string
  /** Unset for a new session */
  sessionId?: string
  sessionName: string
  /** When the new session was held; `null` lets the app decide */
  sessionDate: Date | null
}

/**
 * Class → session pickers, each with a "+ New …" option that reveals a name
 * input, and an optional date and time for a new session. Reports a complete
 * destination, or `null` while a choice or name is missing.
 */
function SessionDestinationFields({
  classes,
  defaultSessionDate = null,
  dateDescription = "Leave empty to use the upload time.",
  disabled = false,
  onValueChange,
  className,
}: {
  classes: DestinationClass[]
  /** Pre-fills a new session's date, e.g. when the recording was made */
  defaultSessionDate?: Date | null
  /** Help under the date field */
  dateDescription?: string
  disabled?: boolean
  onValueChange?: (destination: SessionDestination | null) => void
  className?: string
}) {
  const uid = React.useId()
  const [classKey, setClassKey] = React.useState("")
  const [newClassName, setNewClassName] = React.useState("")
  const [sessionKey, setSessionKey] = React.useState("")
  const [newSessionName, setNewSessionName] = React.useState("")
  const [sessionDate, setSessionDate] = React.useState<Date | null>(
    defaultSessionDate
  )

  const klass = classes.find((c) => c.id === classKey)
  const sessions = klass?.sessions ?? []
  // A new class has no sessions yet, so its session is always new.
  const creatingSession = classKey === NEW || sessionKey === NEW

  const pickedClassName = classKey === NEW ? newClassName.trim() : klass?.name
  const session = creatingSession
    ? undefined
    : sessions.find((s) => s.id === sessionKey)
  const sessionName = creatingSession ? newSessionName.trim() : session?.name
  const destination: SessionDestination | null =
    pickedClassName && sessionName
      ? {
          classId: klass?.id,
          className: pickedClassName,
          sessionId: session?.id,
          sessionName,
          sessionDate: creatingSession ? sessionDate : null,
        }
      : null

  // Report only real changes, so a parent that stores the destination (and
  // re-renders with a fresh `classes` array) doesn't loop.
  const reported = React.useRef<string | undefined>(undefined)
  const key = JSON.stringify(destination)
  React.useEffect(() => {
    if (reported.current === key) return
    reported.current = key
    onValueChange?.(destination)
  })

  return (
    <FieldGroup
      data-slot="session-destination-fields"
      className={cn("gap-4", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${uid}-class`}>Class</FieldLabel>
          <Select
            value={classKey}
            disabled={disabled}
            onValueChange={(next) => {
              setClassKey(next)
              setSessionKey(next === NEW ? NEW : "")
            }}
          >
            <SelectTrigger id={`${uid}-class`} className="w-full">
              <SelectValue placeholder="Select a class…" />
            </SelectTrigger>
            <SelectContent>
              {classes.length > 0 && (
                <SelectGroup>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
              {classes.length > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectItem value={NEW}>+ New class</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {classKey === NEW && (
            <Input
              aria-label="New class name"
              placeholder="e.g., Grade 8 Science"
              value={newClassName}
              disabled={disabled}
              onChange={(event) => setNewClassName(event.target.value)}
            />
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor={`${uid}-session`}>Session</FieldLabel>
          <Select
            value={sessionKey}
            disabled={disabled || !classKey}
            onValueChange={setSessionKey}
          >
            <SelectTrigger id={`${uid}-session`} className="w-full">
              <SelectValue
                placeholder={
                  classKey ? "Select a session…" : "Pick a class first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {sessions.length > 0 && (
                <SelectGroup>
                  {sessions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
              {sessions.length > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectItem value={NEW}>+ New session</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {creatingSession && (
            <Input
              aria-label="New session name"
              placeholder="e.g., Period 3 — Aug 21"
              value={newSessionName}
              disabled={disabled}
              onChange={(event) => setNewSessionName(event.target.value)}
            />
          )}
        </Field>
      </div>
      {creatingSession && (
        <Field>
          <FieldLabel htmlFor={`${uid}-date`}>
            Date
            <span className="font-normal text-muted-foreground">
              — optional
            </span>
          </FieldLabel>
          <DateTimePicker
            id={`${uid}-date`}
            value={sessionDate}
            onValueChange={setSessionDate}
            clearable
            disabled={disabled}
          />
          <FieldDescription>{dateDescription}</FieldDescription>
        </Field>
      )}
    </FieldGroup>
  )
}

export { SessionDestinationFields }
