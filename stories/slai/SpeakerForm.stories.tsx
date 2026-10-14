import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  SpeakerForm,
  type SpeakerCountMode,
} from "@/components/slai/speaker-form"

const meta: Meta<typeof SpeakerForm> = {
  title: "SLAI/SpeakerForm",
  component: SpeakerForm,
  tags: ["autodocs"],
  args: { defaultSpeakerCount: 3 },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SpeakerForm>

/** Controlled: the page owns the mode and speaker count. */
export const Controlled: Story = {
  render: function Controlled(args) {
    const [mode, setMode] = React.useState<SpeakerCountMode>("manual")
    const [count, setCount] = React.useState(3)
    return (
      <SpeakerForm
        {...args}
        value={mode}
        onValueChange={setMode}
        speakerCount={count}
        onSpeakerCountChange={setCount}
      />
    )
  },
}

/** Uncontrolled: the form keeps its own state from the defaults. */
export const Auto: Story = {}

export const Manual: Story = { args: { defaultValue: "manual" } }

export const Analyzed: Story = { args: { analyzed: true } }

export const Analyzing: Story = {
  args: { loading: true, defaultValue: "manual" },
}
