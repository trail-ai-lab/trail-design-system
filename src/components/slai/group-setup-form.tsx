"use client"

import * as React from "react"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { StudentChip } from "@/components/slai/student-chip"

function StepNumber({
  active,
  children,
}: {
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium",
        active
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
 */
function GroupSetupForm({
  onContinue,
  className,
}: {
  onContinue?: (group: { name: string; students: string[] }) => void
  className?: string
}) {
  const [groupName, setGroupName] = React.useState("")
  const [students, setStudents] = React.useState<string[]>([])
  const [studentInput, setStudentInput] = React.useState("")

  const addStudent = () => {
    const name = studentInput.trim()
    if (!name) return
    setStudents((prev) => [...prev, name])
    setStudentInput("")
  }

  const removeStudent = (index: number) => {
    setStudents((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">Group Setup</h1>
        <p className="text-sm text-muted-foreground">
          Tell us a bit about your group before you start recording.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="slai-group-name" className="items-center gap-2">
            <StepNumber active>1</StepNumber>
            Group Name
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="slai-group-name"
            placeholder="e.g., Team Alpha"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel
              htmlFor="slai-student-name"
              className="items-center gap-2"
            >
              <StepNumber>2</StepNumber>
              Students
              <span className="font-normal text-muted-foreground">
                (optional)
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
              id="slai-student-name"
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
              disabled={!studentInput.trim()}
              aria-label="Add student"
            >
              <PlusIcon />
            </Button>
          </div>

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

      <Button
        size="lg"
        className="w-full"
        disabled={!groupName.trim()}
        onClick={() => onContinue?.({ name: groupName, students })}
      >
        Continue to Recording
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}

export { GroupSetupForm }
