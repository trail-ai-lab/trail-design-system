"use client"

import * as React from "react"
import { PlayIcon, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useControllableState } from "@/lib/use-controllable-state"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionLabel } from "@/components/patterns/section-label"
import {
  LanguageSettingsForm,
  defaultLanguageSettings,
  type LanguageSettingsValue,
} from "@/components/slai/language-settings-form"
import type { LanguageOptions } from "@/components/slai/lib/language-option"
import type { CourseMaterial } from "@/components/slai/lib/course-material"
import { SessionMaterialsPicker } from "@/components/slai/session-materials-picker"

const NEW_CLASS = "__new_class__"

/**
 * "Start a new session" card shown when no session is active.
 * Collects class, session name, language settings and — with `materials` —
 * the course materials this session's answers should look at first.
 */
function NewSessionForm({
  classes,
  defaultClass,
  onStartSession,
  loading = false,
  allowNewClass = false,
  defaultLanguages = defaultLanguageSettings,
  languages,
  spokenLanguages,
  translationLanguages,
  materials,
  materialIds: materialIdsProp,
  defaultMaterialIds = [],
  onMaterialIdsChange,
  onUploadMaterials,
  className,
}: {
  classes: string[]
  defaultClass?: string
  onStartSession?: (session: {
    klass: string
    session: string
    languages: LanguageSettingsValue
    /** Picked course materials' ids; empty without `materials` */
    materialIds: string[]
  }) => void
  /** Session is being created; disables the form and shows a spinner */
  loading?: boolean
  /** Adds a "+ New class" option that reveals a free-text class input */
  allowNewClass?: boolean
  /** Initial language settings, e.g. the teacher's saved preference */
  defaultLanguages?: LanguageSettingsValue
  /** Language lists, passed to `LanguageSettingsForm` */
  languages?: LanguageOptions
  spokenLanguages?: LanguageOptions
  translationLanguages?: LanguageOptions
  /** Each class's course materials, keyed by class name; shows the "Course materials" section */
  materials?: Record<string, CourseMaterial[]>
  /** Picked materials' ids. Control it to pre-select files uploaded from here */
  materialIds?: string[]
  defaultMaterialIds?: string[]
  onMaterialIdsChange?: (materialIds: string[]) => void
  /**
   * Shows an Upload button beside the materials picker (and "Upload new…" in
   * it); open `UploadMaterialsSheet` for `klass` and add the new files to
   * `materialIds` so this session uses them
   */
  onUploadMaterials?: (klass: string) => void
  className?: string
}) {
  const uid = React.useId()
  const [klass, setKlass] = React.useState(defaultClass ?? "")
  const [session, setSession] = React.useState("")
  const [newClass, setNewClass] = React.useState("")
  const creatingClass = klass === NEW_CLASS
  const resolvedClass = creatingClass ? newClass.trim() : klass
  const languagesRef = React.useRef<LanguageSettingsValue>(defaultLanguages)
  const [materialIds, setMaterialIds] = useControllableState({
    value: materialIdsProp,
    defaultValue: defaultMaterialIds,
    onChange: onMaterialIdsChange,
  })
  const classMaterials = materials?.[resolvedClass] ?? []

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Start a new session</CardTitle>
        <CardDescription>
          Pick the class and name this session. Groups join with the invite link
          once it starts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <SectionLabel asChild>
              <legend className="mb-3">Session details</legend>
            </SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor={`${uid}-new-session-class`}>
                  Class
                </FieldLabel>
                <Select
                  value={klass}
                  onValueChange={(next) => {
                    setKlass(next)
                    setMaterialIds([])
                  }}
                >
                  <SelectTrigger
                    id={`${uid}-new-session-class`}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a class…" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.length > 0 && (
                      <SelectGroup>
                        {classes.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                    {allowNewClass && (
                      <>
                        {classes.length > 0 && <SelectSeparator />}
                        <SelectGroup>
                          <SelectItem value={NEW_CLASS}>+ New class</SelectItem>
                        </SelectGroup>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {creatingClass && (
                  <Input
                    aria-label="New class name"
                    placeholder="e.g., Grade 8 Science"
                    value={newClass}
                    onChange={(event) => setNewClass(event.target.value)}
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor={`${uid}-new-session-name`}>
                  Session
                </FieldLabel>
                <Input
                  id={`${uid}-new-session-name`}
                  placeholder="e.g., Period 3 — Aug 21"
                  value={session}
                  onChange={(event) => setSession(event.target.value)}
                />
              </Field>
            </div>
          </FieldSet>

          {materials && resolvedClass && (
            <FieldSet>
              <SectionLabel asChild>
                <legend className="mb-3">Course materials</legend>
              </SectionLabel>
              <Field>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor={`${uid}-new-session-materials`}>
                    For this session
                    <span className="font-normal text-muted-foreground">
                      — optional
                    </span>
                  </FieldLabel>
                  {onUploadMaterials && (
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => onUploadMaterials(resolvedClass)}
                    >
                      <UploadIcon data-icon="inline-start" />
                      Upload
                    </Button>
                  )}
                </div>
                <SessionMaterialsPicker
                  id={`${uid}-new-session-materials`}
                  materials={classMaterials}
                  value={materialIds}
                  onValueChange={setMaterialIds}
                  placeholder={
                    classMaterials.length === 0
                      ? `No materials in ${resolvedClass} yet`
                      : "Select materials"
                  }
                  onUploadNew={
                    onUploadMaterials
                      ? () => onUploadMaterials(resolvedClass)
                      : undefined
                  }
                />
              </Field>
            </FieldSet>
          )}

          <FieldSet>
            <SectionLabel asChild>
              <legend className="mb-3">Languages</legend>
            </SectionLabel>
            <LanguageSettingsForm
              defaultValue={defaultLanguages}
              languages={languages}
              spokenLanguages={spokenLanguages}
              translationLanguages={translationLanguages}
              onValueChange={(value) => {
                languagesRef.current = value
              }}
            />
          </FieldSet>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!resolvedClass || loading}
          onClick={() =>
            onStartSession?.({
              klass: resolvedClass,
              session,
              languages: languagesRef.current,
              materialIds,
            })
          }
        >
          {loading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          {loading ? "Starting…" : "Start session"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { NewSessionForm }
