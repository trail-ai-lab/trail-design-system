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
  args: { mode: "auto", speakerCount: 3 },
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

export const Interactive: Story = {
  render: function Controlled(args) {
    const [mode, setMode] = React.useState<SpeakerCountMode>(args.mode)
    const [count, setCount] = React.useState(args.speakerCount)
    return (
      <SpeakerForm
        {...args}
        mode={mode}
        onModeChange={setMode}
        speakerCount={count}
        onSpeakerCountChange={setCount}
      />
    )
  },
}

export const Auto: Story = {}

export const Manual: Story = { args: { mode: "manual" } }

export const Analyzed: Story = { args: { analyzed: true } }

export const Analyzing: Story = { args: { loading: true, mode: "manual" } }
