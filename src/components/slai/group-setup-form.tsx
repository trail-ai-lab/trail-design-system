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
 */
function GroupSetupForm({
  onContinue,
  loading = false,
  notice,
  className,
}: {
  /** Receives the trimmed group name and the students added */
  onContinue?: (group: { name: string; students: string[] }) => void
  /** The group is being created: the button shows "Joining…" and is disabled */
  loading?: boolean
  /** A warning shown at the top of the card, e.g. "Your group was removed by
   * the teacher. Please set up a new group to continue." */
  notice?: React.ReactNode
  className?: string
}) {
  const uid = React.useId()
  const [groupName, setGroupName] = React.useState("")
  const [students, setStudents] = React.useState<string[]>([])
  const [studentInput, setStudentInput] = React.useState("")

  const pendingStudent = studentInput.trim()
  const alreadyAdded = students.includes(pendingStudent)

  const addStudent = () => {
    const name = studentInput.trim()
    if (!name || students.includes(name)) return
    setStudents((prev) => [...prev, name])
    setStudentInput("")
  }

  const removeStudent = (index: number) => {
    setStudents((prev) => prev.filter((_, i) => i !== index))
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
                <span className="text-sm text-muted-foreground">
                  {students.length} added
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id={`${uid}-student-name`}
                placeholder="Enter a student name"
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
                disabled={!pendingStudent || alreadyAdded}
                aria-label="Add student"
              >
                <PlusIcon />
              </Button>
            </div>
            {alreadyAdded && (
              <FieldDescription>
                {pendingStudent} is already in the group.
              </FieldDescription>
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
          onClick={() => onContinue?.({ name: groupName.trim(), students })}
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
