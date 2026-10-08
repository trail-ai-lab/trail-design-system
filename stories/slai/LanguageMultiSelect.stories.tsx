import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"

const meta: Meta<typeof LanguageMultiSelect> = {
  title: "SLAI/LanguageMultiSelect",
  component: LanguageMultiSelect,
  tags: ["autodocs"],
  args: {
    "aria-label": "Languages",
    options: DEFAULT_LANGUAGES,
    value: [],
    onValueChange: () => {},
    helperText: "Helps transcription accuracy. Leave empty to auto-detect.",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LanguageMultiSelect>

export const Default: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<string[]>([])
    return (
      <LanguageMultiSelect {...args} value={value} onValueChange={setValue} />
    )
  },
}

export const WithSelection: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState(["Marathi", "English (US)"])
    return (
      <LanguageMultiSelect {...args} value={value} onValueChange={setValue} />
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true, value: ["Hindi"] },
}
