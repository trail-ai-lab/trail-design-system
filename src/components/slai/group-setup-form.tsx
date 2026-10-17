"use client"

import * as React from "react"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { InsightCallout } from "@/components/slai/insight-callout"
import { StudentChip } from "@/components/slai/student-chip"
import type { RosterStudent } from "@/components/slai/contribution-panel"

/** A student added to the group: their name, and roster id when picked from
 * (or typed exactly as on) the class roster. */
export interface GroupMember {
  name: string
  studentId?: string
}

const nameKey = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase()

function StepNumber({
  isActive,
  children,
}: {
  isActive?: boolean
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium",
        isActive
          ? "bg-foreground text-background"
          : "bg-muted text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

/**
 * Group setup collected on a student's device after joining a session (QR
 * code or link): a group name and, optionally, who's recording together —
 * shown before the student moves on to the recording screen.
 *
 * `loading` covers creating the group on the server; `notice` explains why
 * the student is back here (e.g. the teacher removed their group).
 *
 * With a class `roster`, students tap their names instead of typing them, so
 * each member carries the roster id (`members` in `onContinue`). Names not on
 * the roster can still be typed.
 */
function GroupSetupForm({
  onContinue,
  loading = false,
  notice,
  maxStudents = 6,
  roster,
  className,
}: {
  /** Receives the trimmed group name, the students' names, and each member
   * with their roster id when known */
  onContinue?: (group: {
    name: string
    students: string[]
    members: GroupMember[]
  }) => void
  /** The group is being created: the button shows "Joining…" and is disabled */
  loading?: boolean
  /** A warning shown at the top of the card, e.g. "Your group was removed by
   * the teacher. Please set up a new group to continue." */
  notice?: React.ReactNode
  /** Most students a group can hold; adding stops there */
  maxStudents?: number
  /** The class roster to pick names from */
  roster?: RosterStudent[]
  className?: string
}) {
  const uid = React.useId()
  const [groupName, setGroupName] = React.useState("")
  const [members, setMembers] = React.useState<GroupMember[]>([])
  const [studentInput, setStudentInput] = React.useState("")

  const students = members.map((member) => member.name)
  const addedKeys = new Set(students.map(nameKey))
  const pendingStudent = studentInput.trim()
  const alreadyAdded = addedKeys.has(nameKey(pendingStudent))
  const isFull = students.length >= maxStudents

  const rosterByKey = new Map(
    (roster ?? []).map((student) => [nameKey(student.name), student])
  )
  const suggestions = (roster ?? []).filter(
    (student) =>
      !addedKeys.has(nameKey(student.name)) &&
      (!pendingStudent ||
        nameKey(student.name).includes(nameKey(pendingStudent)))
  )

  const addMember = (member: GroupMember) => {
    if (isFull || addedKeys.has(nameKey(member.name))) return
    setMembers((prev) => [...prev, member])
    setStudentInput("")
  }

  const addStudent = () => {
    const name = studentInput.trim()
    if (!name) return
    // A typed name that matches the roster gets that student's id
    const match = rosterByKey.get(nameKey(name))
    addMember(match ? { name: match.name, studentId: match.id } : { name })
  }

  const removeStudent = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card data-slot="group-setup-form" className={className}>
      <CardHeader>
        <CardTitle>Group setup</CardTitle>
        <CardDescription>
          Tell us a bit about your group before you start recording.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {notice && (
            <InsightCallout variant="warning">{notice}</InsightCallout>
          )}
          <Field>
            <FieldLabel
              htmlFor={`${uid}-group-name`}
              className="items-center gap-2"
            >
              <StepNumber isActive>1</StepNumber>
              Group name
            </FieldLabel>
            <Input
              id={`${uid}-group-name`}
              required
              placeholder="e.g., Team Alpha"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel
                htmlFor={`${uid}-student-name`}
                className="items-center gap-2"
              >
                <StepNumber>2</StepNumber>
                Students
                <span className="font-normal text-muted-foreground">
                  — optional
                </span>
              </FieldLabel>
              {students.length > 0 && (
                <span className="text-sm text-muted-foreground tabular-nums">
                  {students.length}/{maxStudents} added
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id={`${uid}-student-name`}
                placeholder={
                  roster?.length ? "Find your name" : "Enter a student name"
                }
                disabled={isFull}
                value={studentInput}
                onChange={(event) => setStudentInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addStudent()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addStudent}
                disabled={!pendingStudent || alreadyAdded || isFull}
                aria-label="Add student"
              >
                <PlusIcon />
              </Button>
            </div>
            {isFull ? (
              <FieldDescription>
                Groups can have up to {maxStudents} students.
              </FieldDescription>
            ) : (
              alreadyAdded && (
                <FieldDescription>
                  {pendingStudent} is already in the group.
                </FieldDescription>
              )
            )}

            {!isFull && suggestions.length > 0 && (
              <div
                role="group"
                aria-label="Students in this class"
                className="flex max-h-32 flex-wrap gap-2 overflow-y-auto"
              >
                {suggestions.map((student) => (
                  <Button
                    key={student.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addMember({ name: student.name, studentId: student.id })
                    }
                  >
                    <PlusIcon data-icon="inline-start" />
                    {student.name}
                  </Button>
                ))}
              </div>
            )}

            {students.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {students.map((name, index) => (
                  <StudentChip
                    key={`${name}-${index}`}
                    name={name}
                    onRemove={() => removeStudent(index)}
                  />
                ))}
              </div>
            )}
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!groupName.trim() || loading}
          onClick={() =>
            onContinue?.({
              name: groupName.trim(),
              students: students.slice(0, maxStudents),
              members: members.slice(0, maxStudents),
            })
          }
        >
          {loading ? (
            <>
              <Spinner data-icon="inline-start" />
              Joining…
            </>
          ) : (
            <>
              Continue to recording
              <ArrowRightIcon data-icon="inline-end" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { GroupSetupForm }
