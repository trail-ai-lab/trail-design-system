"use client"

import * as React from "react"
import { PlayIcon } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
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

const NEW_CLASS = "__new_class__"

/**
 * "Start a new session" card shown when no session is active.
 * Collects class, session name, and language settings.
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
  className,
}: {
  classes: string[]
  defaultClass?: string
  onStartSession?: (session: {
    klass: string
    session: string
    languages: LanguageSettingsValue
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
  className?: string
}) {
  const uid = React.useId()
  const [klass, setKlass] = React.useState(defaultClass ?? "")
  const [session, setSession] = React.useState("")
  const [newClass, setNewClass] = React.useState("")
  const creatingClass = klass === NEW_CLASS
  const resolvedClass = creatingClass ? newClass.trim() : klass
  const languagesRef = React.useRef<LanguageSettingsValue>(defaultLanguages)

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
                <Select value={klass} onValueChange={setKlass}>
                  <SelectTrigger
                    id={`${uid}-new-session-class`}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a class…" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                    {allowNewClass && (
                      <SelectItem value={NEW_CLASS}>+ New class</SelectItem>
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
