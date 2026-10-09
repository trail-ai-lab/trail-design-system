"use client"

import * as React from "react"

import { useControllableState } from "@/lib/use-controllable-state"

import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { LanguageCombobox } from "@/components/slai/language-combobox"
import type { LanguageOptions } from "@/components/slai/lib/language-option"

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

/** Language settings. Language fields hold option values (e.g. codes). */
export interface LanguageSettingsValue {
  transcription: boolean
  mode: "auto" | "specific"
  /** Spoken language, from `spokenLanguages` */
  language1: string
  /** Optional second spoken language, from `spokenLanguages` */
  language2?: string
  translation: boolean
  /** Target language, from `translationLanguages` */
  translateTo: string
  /** Mask profanity in transcripts and translations */
  profanityFilter?: boolean
}

const defaultLanguageSettings: LanguageSettingsValue = {
  transcription: true,
  mode: "specific",
  language1: "Marathi",
  language2: "English (US)",
  translation: true,
  translateTo: "English (US)",
  profanityFilter: false,
}

function LanguageSelect({
  value,
  onValueChange,
  languages,
  placeholder,
  allowNone = false,
  id,
  "aria-label": ariaLabel,
}: {
  value?: string
  onValueChange: (value: string | undefined) => void
  languages: LanguageOptions
  placeholder?: string
  allowNone?: boolean
  id?: string
  "aria-label"?: string
}) {
  return (
    <LanguageCombobox
      id={id}
      aria-label={ariaLabel}
      value={value}
      onValueChange={onValueChange}
      languages={languages}
      placeholder={placeholder}
      noneLabel={allowNone ? "None" : undefined}
    />
  )
}

/**
 * Transcription + translation language configuration. Used inside the
 * "Start a new session" card and the Language Settings sheet of an
 * active session.
 *
 * Spoken and translation languages can come from different lists (e.g.
 * speech-to-text codes vs translation codes); pass `{ value, label }` options
 * to store codes. Translation and the profanity filter apply to the
 * transcript, so they're hidden while live transcription is off, and turning
 * transcription off also turns translation off.
 */
function LanguageSettingsForm({
  value: valueProp,
  defaultValue = defaultLanguageSettings,
  onValueChange,
  languages = DEFAULT_LANGUAGES,
  spokenLanguages = languages,
  translationLanguages = languages,
  className,
}: {
  value?: LanguageSettingsValue
  defaultValue?: LanguageSettingsValue
  onValueChange?: (value: LanguageSettingsValue) => void
  /** Languages for both lists, unless overridden below */
  languages?: LanguageOptions
  /** Options for Language 1 / Language 2 */
  spokenLanguages?: LanguageOptions
  /** Options for "Translate to" */
  translationLanguages?: LanguageOptions
  className?: string
}) {
  const uid = React.useId()
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })

  const update = (patch: Partial<LanguageSettingsValue>) =>
    setValue({ ...value, ...patch })

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
          onCheckedChange={(checked) =>
            update(
              checked
                ? { transcription: true }
                : { transcription: false, translation: false }
            )
          }
          aria-label="Live transcription"
        />
      </Field>

      {value.transcription && (
        <>
          <RadioGroup
            value={value.mode}
            onValueChange={(mode) =>
              update({ mode: mode as LanguageSettingsValue["mode"] })
            }
            aria-label="Spoken language mode"
            className="grid gap-3 @md/field-group:grid-cols-2"
          >
            <FieldLabel htmlFor={`${uid}-mode-auto`}>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value="auto"
                  id={`${uid}-mode-auto`}
                  aria-labelledby={`${uid}-mode-auto-title`}
                />
                <FieldContent>
                  <FieldTitle id={`${uid}-mode-auto-title`}>
                    Auto-detect
                  </FieldTitle>
                  <FieldDescription>
                    Detects all languages automatically.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor={`${uid}-mode-specific`}>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value="specific"
                  id={`${uid}-mode-specific`}
                  aria-labelledby={`${uid}-mode-specific-title`}
                />
                <FieldContent>
                  <FieldTitle id={`${uid}-mode-specific-title`}>
                    Specific
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      Recommended
                    </Badge>
                  </FieldTitle>
                  <FieldDescription>
                    Specify up to 2 languages for better accuracy.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>

          {value.mode === "specific" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor={`${uid}-language-1`}>
                  Language 1
                </FieldLabel>
                <LanguageSelect
                  id={`${uid}-language-1`}
                  aria-label="Language 1"
                  value={value.language1}
                  onValueChange={(language1) =>
                    language1 && update({ language1 })
                  }
                  languages={spokenLanguages}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${uid}-language-2`}>
                  Language 2
                  <span className="font-normal text-muted-foreground">
                    — optional
                  </span>
                </FieldLabel>
                <LanguageSelect
                  id={`${uid}-language-2`}
                  aria-label="Language 2"
                  value={value.language2}
                  onValueChange={(language2) => update({ language2 })}
                  languages={spokenLanguages}
                  allowNone
                />
              </Field>
            </div>
          )}

          <FieldSeparator />

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
                  aria-label="Translate to"
                  value={value.translateTo}
                  onValueChange={(translateTo) =>
                    translateTo && update({ translateTo })
                  }
                  languages={translationLanguages}
                />
              </div>
            </Field>
          )}

          <FieldSeparator />

          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Profanity filter</FieldTitle>
              <FieldDescription>
                Mask profanity in transcripts and translations.
              </FieldDescription>
            </FieldContent>
            <Switch
              checked={value.profanityFilter ?? false}
              onCheckedChange={(checked) =>
                update({ profanityFilter: checked })
              }
              aria-label="Profanity filter"
            />
          </Field>
        </>
      )}
    </FieldGroup>
  )
}

export { LanguageSettingsForm, DEFAULT_LANGUAGES, defaultLanguageSettings }
