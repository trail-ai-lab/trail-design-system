"use client"

import * as React from "react"
import { UserPlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import type { RosterStudent } from "@/components/slai/contribution-panel"

/** A name from groups or speaker assignments that links to no roster student. */
export interface UnlinkedName {
  name: string
  /** Groups whose members include this name */
  groupCount?: number
  /** Recordings where a speaker was given this name */
  recordingCount?: number
}

/** "2 groups · 1 recording" */
function whereSeen(entry: UnlinkedName) {
  const parts: string[] = []
  if (entry.groupCount)
    parts.push(
      `${entry.groupCount} ${entry.groupCount === 1 ? "group" : "groups"}`
    )
  if (entry.recordingCount)
    parts.push(
      `${entry.recordingCount} ${entry.recordingCount === 1 ? "recording" : "recordings"}`
    )
  return parts.join(" · ")
}

/**
 * Names typed on student devices or given to speakers that don't match anyone
 * on the class roster. The teacher links each to a roster student (`onLink`;
 * the spelling becomes their alias, so it links on its own next time) or adds
 * it as a new student (`onCreate`). Render it only while `names` is non-empty.
 */
function NamesToLinkCard({
  names,
  students,
  loadingName,
  onLink,
  onCreate,
  className,
}: {
  names: UnlinkedName[]
  /** Roster students a name can be linked to */
  students: RosterStudent[]
  /** The name being linked or added; its row is disabled with a spinner */
  loadingName?: string
  onLink?: (name: string, studentId: string) => void
  onCreate?: (name: string) => void
  className?: string
}) {
  const uid = React.useId()
  return (
    <Card data-slot="names-to-link-card" className={cn(className)}>
      <CardHeader>
        <CardTitle>Names to link</CardTitle>
        <CardDescription>
          These names from groups and speakers don&apos;t match anyone on the
          roster. Link each to a student, or add them as a new student.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {names.map((entry, index) => {
            const loading = loadingName === entry.name
            const selectId = `${uid}-link-${index}`
            const seen = whereSeen(entry)
            return (
              <Item
                key={entry.name}
                role="listitem"
                variant="outline"
                size="sm"
              >
                <ItemContent>
                  <ItemTitle>{entry.name}</ItemTitle>
                  {seen && <ItemDescription>{seen}</ItemDescription>}
                </ItemContent>
                <ItemActions className="flex-wrap">
                  {loading && <Spinner aria-label="Linking" />}
                  {onLink && students.length > 0 && (
                    <>
                      <label htmlFor={selectId} className="sr-only">
                        Link {entry.name} to a student
                      </label>
                      <NativeSelect
                        id={selectId}
                        size="sm"
                        value=""
                        disabled={loading}
                        onChange={(event) => {
                          if (event.target.value)
                            onLink(entry.name, event.target.value)
                        }}
                      >
                        <NativeSelectOption value="">
                          Link to…
                        </NativeSelectOption>
                        {students.map((student) => (
                          <NativeSelectOption
                            key={student.id}
                            value={student.id}
                          >
                            {student.name}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </>
                  )}
                  {onCreate && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => onCreate(entry.name)}
                    >
                      <UserPlusIcon data-icon="inline-start" />
                      Add as student
                    </Button>
                  )}
                </ItemActions>
              </Item>
            )
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

export { NamesToLinkCard }
