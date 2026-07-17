import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
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
        <LanguageSettingsForm value={value} onChange={setValue} />
      </div>
    )
  },
}

export const TranscriptionDisabled: Story = {
  render: function Disabled() {
    const [value, setValue] = React.useState<LanguageSettingsValue>({
      ...defaultLanguageSettings,
      transcription: false,
      translation: false,
    })
    return (
      <div className="w-full max-w-md">
        <LanguageSettingsForm value={value} onChange={setValue} />
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
