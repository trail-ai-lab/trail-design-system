"use client"

import * as React from "react"
import { MicIcon, UsersIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dropzone } from "@/components/trail/dropzone"
import { FileList, type UploadedFile } from "@/components/slai/file-list"
import {
  GroupBuilder,
  type GroupPreset,
} from "@/components/slai/group-builder"
import type {
  RosterStudent,
  SessionGroup,
} from "@/components/slai/group-card"
import { formatBytes } from "@/components/slai/lib/format"

export interface SessionSetupValues {
  klass: string
  sessionName: string
  standard: string
  widaStandard: string
  objective: string
  groups: SessionGroup[]
  recordings: File[]
  materials: File[]
}

const toList = (files: File[]): UploadedFile[] =>
  files.map((file, i) => ({
    id: `${file.name}-${i}`,
    name: file.name,
    sizeLabel: formatBytes(file.size),
  }))

/**
 * Full "Set up a session" page for a teacher who already knows their roster:
 * session details with the learning standards, recordings and course
 * materials to attach, and the student group builder. Start is enabled once
 * a class, session name and at least one populated group exist. Use
 * NewSessionForm for the lighter class-and-languages start.
 */
function SessionSetupForm({
  roster,
  presets,
  initialGroups = [],
  onStart,
  onRecordLive,
  className,
}: {
  roster: RosterStudent[]
  presets?: GroupPreset[]
  initialGroups?: SessionGroup[]
  onStart?: (values: SessionSetupValues) => void
  /** Skip setup and record without a session */
  onRecordLive?: () => void
  className?: string
}) {
  const [klass, setKlass] = React.useState("")
  const [sessionName, setSessionName] = React.useState("")
  const [standard, setStandard] = React.useState("")
  const [widaStandard, setWidaStandard] = React.useState("")
  const [objective, setObjective] = React.useState("")
  const [groups, setGroups] = React.useState(initialGroups)
  const [recordings, setRecordings] = React.useState<File[]>([])
  const [materials, setMaterials] = React.useState<File[]>([])

  const canStart =
    klass.trim() !== "" &&
    sessionName.trim() !== "" &&
    groups.some((g) => g.studentIds.length > 0)

  return (
    <div className={className}>
      <h1 className="mb-4 font-heading text-2xl font-semibold">Set up a session</h1>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Session details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field>
                  <FieldLabel htmlFor="setup-class">Class</FieldLabel>
                  <Input id="setup-class" value={klass} onChange={(e) => setKlass(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-session">Session name</FieldLabel>
                  <Input id="setup-session" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-standard">Standard</FieldLabel>
                  <Input id="setup-standard" className="font-mono" placeholder="3.OA.A.2" value={standard} onChange={(e) => setStandard(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-wida">WIDA standard</FieldLabel>
                  <Input id="setup-wida" className="font-mono" placeholder="ELD-MA.4-5.Explain" value={widaStandard} onChange={(e) => setWidaStandard(e.target.value)} />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="setup-objective">
                  Session objective
                  <span className="font-normal text-muted-foreground">— optional</span>
                </FieldLabel>
                <Input id="setup-objective" value={objective} onChange={(e) => setObjective(e.target.value)} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <Card className="lg:w-80 lg:shrink-0">
            <CardHeader>
              <CardTitle>Recordings</CardTitle>
              <CardDescription>Audio or video, or record live.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Dropzone
                multiple
                accept="audio/*,video/*"
                title="Drop recordings or click to browse"
                onFilesSelected={(f) => setRecordings((r) => [...r, ...f])}
              />
              <FileList
                files={toList(recordings)}
                onRemove={(id) =>
                  setRecordings((r) => r.filter((_, i) => `${r[i].name}-${i}` !== id))
                }
              />
              <CardTitle className="pt-2">Course materials</CardTitle>
              <Dropzone
                multiple
                accept=".pdf,.doc,.docx,.txt,.rtf"
                title="Drop PDF, Word or text files"
                onFilesSelected={(f) => setMaterials((m) => [...m, ...f])}
              />
              <FileList
                files={toList(materials)}
                onRemove={(id) =>
                  setMaterials((m) => m.filter((_, i) => `${m[i].name}-${i}` !== id))
                }
              />
            </CardContent>
          </Card>

          <Card className="min-w-0 flex-1">
            <CardHeader>
              <CardTitle>Student groups</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupBuilder
                roster={roster}
                groups={groups}
                onGroupsChange={setGroups}
                presets={presets}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          {onRecordLive && (
            <Button variant="outline" onClick={onRecordLive}>
              <MicIcon data-icon="inline-start" />
              Record live only
            </Button>
          )}
          <Button
            disabled={!canStart}
            onClick={() =>
              onStart?.({ klass, sessionName, standard, widaStandard, objective, groups, recordings, materials })
            }
          >
            <UsersIcon data-icon="inline-start" />
            Start session
          </Button>
        </div>
      </div>
    </div>
  )
}

export { SessionSetupForm }
