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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LanguageSettingsForm,
  defaultLanguageSettings,
  type LanguageSettingsValue,
} from "@/components/slai/language-settings-form"

/**
 * "Start a new session" card shown when no session is active.
 * Collects class, session name, and language settings.
 */
function NewSessionForm({
  classes,
  defaultClass,
  onStartSession,
  className,
}: {
  classes: string[]
  defaultClass?: string
  onStartSession?: (session: {
    klass: string
    session: string
    languages: LanguageSettingsValue
  }) => void
  className?: string
}) {
  const [klass, setKlass] = React.useState(defaultClass ?? "")
  const [session, setSession] = React.useState("")
  const languagesRef = React.useRef<LanguageSettingsValue>(
    defaultLanguageSettings
  )

  return (
    <Card className={className}>
      <CardHeader>
        <CardDescription>New session</CardDescription>
        <CardTitle className="font-heading">Start a new session</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Session details</FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="slai-new-session-class">
                  Class / Year
                </FieldLabel>
                <Select value={klass} onValueChange={setKlass}>
                  <SelectTrigger
                    id="slai-new-session-class"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="slai-new-session-name">
                  Session / Period
                </FieldLabel>
                <Input
                  id="slai-new-session-name"
                  placeholder="e.g., Period 3 — Aug 21"
                  value={session}
                  onChange={(event) => setSession(event.target.value)}
                />
              </Field>
            </div>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Languages</FieldLegend>
            <LanguageSettingsForm
              onChange={(value) => {
                languagesRef.current = value
              }}
            />
          </FieldSet>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className="w-full"
          disabled={!klass}
          onClick={() =>
            onStartSession?.({
              klass,
              session,
              languages: languagesRef.current,
            })
          }
        >
          <PlayIcon data-icon="inline-start" />
          Start session
        </Button>
      </CardFooter>
    </Card>
  )
}

export { NewSessionForm }
