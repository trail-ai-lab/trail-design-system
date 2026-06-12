"use client"

import * as React from "react"
import { GlobeIcon, LanguagesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const DEFAULT_LANGUAGES = [
  "English (US)",
  "Spanish",
  "Marathi",
  "Hindi",
  "Mandarin",
  "French",
  "German",
  "Portuguese",
]

export interface LanguageSettingsValue {
  transcription: boolean
  mode: "auto" | "specific"
  language1: string
  language2?: string
  translation: boolean
  translateTo: string
}

const defaultLanguageSettings: LanguageSettingsValue = {
  transcription: true,
  mode: "specific",
  language1: "Marathi",
  language2: "English (US)",
  translation: true,
  translateTo: "English (US)",
}

function LanguageSelect({
  value,
  onValueChange,
  languages,
  placeholder = "Select a language...",
  allowNone = false,
}: {
  value?: string
  onValueChange: (value: string) => void
  languages: string[]
  placeholder?: string
  allowNone?: boolean
}) {
  return (
    <Select value={value ?? ""} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowNone && <SelectItem value="none">None</SelectItem>}
        {languages.map((language) => (
          <SelectItem key={language} value={language}>
            {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function ModeCard({
  selected,
  icon: Icon,
  title,
  badge,
  description,
  onSelect,
}: {
  selected: boolean
  icon: typeof GlobeIcon
  title: string
  badge?: string
  description: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex flex-col gap-1 rounded-2xl border p-4 text-left transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-muted/50"
      )}
    >
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="size-4 text-muted-foreground" />
        {title}
        {badge && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {badge}
          </Badge>
        )}
      </span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </button>
  )
}

/**
 * Transcription + translation language configuration. Used inside the
 * "Start a new session" card and the Language Settings sheet of an
 * active session.
 */
function LanguageSettingsForm({
  value: valueProp,
  onChange,
  languages = DEFAULT_LANGUAGES,
  className,
}: {
  value?: LanguageSettingsValue
  onChange?: (value: LanguageSettingsValue) => void
  languages?: string[]
  className?: string
}) {
  const [internal, setInternal] = React.useState(defaultLanguageSettings)
  const value = valueProp ?? internal

  const update = (patch: Partial<LanguageSettingsValue>) => {
    const next = { ...value, ...patch }
    setInternal(next)
    onChange?.(next)
  }

  return (
    <FieldGroup className={className}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Live transcription</FieldTitle>
          <FieldDescription>
            Transcribe student audio in real time.
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={value.transcription}
          onCheckedChange={(checked) => update({ transcription: checked })}
          aria-label="Live transcription"
        />
      </Field>

      {value.transcription && (
        <>
          <div
            role="radiogroup"
            aria-label="Spoken language mode"
            className="grid gap-3 sm:grid-cols-2"
          >
            <ModeCard
              selected={value.mode === "auto"}
              icon={GlobeIcon}
              title="Auto-detect"
              description="Detects all languages automatically."
              onSelect={() => update({ mode: "auto" })}
            />
            <ModeCard
              selected={value.mode === "specific"}
              icon={LanguagesIcon}
              title="Specific"
              badge="Recommended"
              description="Specify up to 2 languages for better accuracy."
              onSelect={() => update({ mode: "specific" })}
            />
          </div>

          {value.mode === "specific" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="slai-language-1">Language 1</FieldLabel>
                <LanguageSelect
                  value={value.language1}
                  onValueChange={(language1) => update({ language1 })}
                  languages={languages}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="slai-language-2">
                  Language 2
                  <span className="font-normal text-muted-foreground">
                    — optional
                  </span>
                </FieldLabel>
                <LanguageSelect
                  value={value.language2}
                  onValueChange={(language2) =>
                    update({
                      language2: language2 === "none" ? undefined : language2,
                    })
                  }
                  languages={languages}
                  allowNone
                />
              </Field>
            </div>
          )}
        </>
      )}

      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Live translation</FieldTitle>
          <FieldDescription>
            Translate the transcript as students speak.
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={value.translation}
          onCheckedChange={(checked) => update({ translation: checked })}
          aria-label="Live translation"
        />
      </Field>

      {value.translation && (
        <Field orientation="responsive">
          <FieldContent>
            <FieldTitle>Translate to</FieldTitle>
          </FieldContent>
          <div className="sm:w-56">
            <LanguageSelect
              value={value.translateTo}
              onValueChange={(translateTo) => update({ translateTo })}
              languages={languages}
            />
          </div>
        </Field>
      )}
    </FieldGroup>
  )
}

export { LanguageSettingsForm, DEFAULT_LANGUAGES, defaultLanguageSettings }
