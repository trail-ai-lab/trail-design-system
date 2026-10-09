import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import { LanguageCombobox } from "@/components/slai/language-combobox"

const meta: Meta<typeof LanguageCombobox> = {
  title: "SLAI/LanguageCombobox",
  component: LanguageCombobox,
  tags: ["autodocs"],
  args: { languages: DEFAULT_LANGUAGES, "aria-label": "Language" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LanguageCombobox>

export const Default: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>("Marathi")
    return <LanguageCombobox {...args} value={value} onValueChange={setValue} />
  },
}

export const Empty: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>()
    return <LanguageCombobox {...args} value={value} onValueChange={setValue} />
  },
}

/** `noneLabel` adds a clearing option, e.g. "Original" for translations. */
export const WithOriginalOption: Story = {
  args: { noneLabel: "Original" },
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>()
    return <LanguageCombobox {...args} value={value} onValueChange={setValue} />
  },
}

export const Disabled: Story = { args: { disabled: true, value: "Spanish" } }

/**
 * `{ value, label }` options: the value (a code) is stored and reported,
 * the label is shown. Search matches both, e.g. "es".
 */
export const WithCodes: Story = {
  args: {
    languages: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "zh-CN", label: "Chinese (Simplified)" },
      { value: "mr", label: "Marathi" },
    ],
    noneLabel: "Original",
  },
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string | undefined>("es")
    return (
      <div className="flex flex-col gap-2">
        <LanguageCombobox {...args} value={value} onValueChange={setValue} />
        <p className="text-xs text-muted-foreground">
          Stored value: {value ?? "(original)"}
        </p>
      </div>
    )
  },
}
