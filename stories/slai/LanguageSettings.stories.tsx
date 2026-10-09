import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { LanguagesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import {
  LanguageSettingsForm,
  defaultLanguageSettings,
  type LanguageSettingsValue,
} from "@/components/slai/language-settings-form"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"

const meta: Meta<typeof LanguageSettingsForm> = {
  title: "SLAI/LanguageSettings",
  component: LanguageSettingsForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof LanguageSettingsForm>

export const Form: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <LanguageSettingsForm />
    </div>
  ),
}

export const AutoDetectMode: Story = {
  render: function AutoDetect() {
    const [value, setValue] = React.useState<LanguageSettingsValue>({
      ...defaultLanguageSettings,
      mode: "auto",
    })
    return (
      <div className="w-full max-w-md">
        <LanguageSettingsForm value={value} onValueChange={setValue} />
      </div>
    )
  },
}

/**
 * Separate code lists for speech-to-text and translation, as an app stores
 * them; the stored value is shown under the form.
 */
export const WithLanguageCodes: Story = {
  render: function WithCodes() {
    const [value, setValue] = React.useState<LanguageSettingsValue>({
      transcription: true,
      mode: "specific",
      language1: "es-US",
      language2: "en-US",
      translation: true,
      translateTo: "en",
      profanityFilter: false,
    })
    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <LanguageSettingsForm
          value={value}
          onValueChange={setValue}
          spokenLanguages={[
            { value: "en-US", label: "English (US)" },
            { value: "es-US", label: "Spanish (US)" },
            { value: "cmn-Hans-CN", label: "Chinese, Mandarin (Simplified)" },
            { value: "mr-IN", label: "Marathi" },
          ]}
          translationLanguages={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "zh-CN", label: "Chinese (Simplified)" },
            { value: "mr", label: "Marathi" },
          ]}
        />
        <pre className="rounded-md bg-muted p-3 text-xs">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    )
  },
}

/** Transcription off: translation and the profanity filter are hidden. */
export const TranscriptionDisabled: Story = {
  render: function Disabled() {
    const [value, setValue] = React.useState<LanguageSettingsValue>({
      ...defaultLanguageSettings,
      transcription: false,
      translation: false,
    })
    return (
      <div className="w-full max-w-md">
        <LanguageSettingsForm value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const InSheet: Story = {
  render: () => (
    <LanguageSettingsSheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <LanguagesIcon data-icon="inline-start" />
          Language
        </Button>
      </SheetTrigger>
    </LanguageSettingsSheet>
  ),
}

export const ProfanityFilterOn: Story = {
  render: () => (
    <LanguageSettingsForm
      value={{ ...defaultLanguageSettings, profanityFilter: true }}
    />
  ),
}
