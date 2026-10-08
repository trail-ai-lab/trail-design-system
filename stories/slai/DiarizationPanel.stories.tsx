import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { ContributionPanel } from "@/components/slai/contribution-panel"
import { DiarizationPanel } from "@/components/slai/diarization-panel"
import { SpeakerForm } from "@/components/slai/speaker-form"

const meta: Meta<typeof DiarizationPanel> = {
  title: "SLAI/DiarizationPanel",
  component: DiarizationPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DiarizationPanel>

const Form = (props: { analyzed?: boolean }) => (
  <SpeakerForm mode="auto" speakerCount={3} {...props} />
)

export const Idle: Story = { args: { state: "idle", form: <Form /> } }

export const Loading: Story = { args: { state: "loading", elapsedSeconds: 47 } }

export const ErrorState: Story = {
  args: {
    state: "error",
    form: <Form />,
    error: "The analysis service timed out.",
    onRetry: () => {},
  },
}

export const Empty: Story = { args: { state: "empty", form: <Form /> } }

export const Ready: Story = {
  args: {
    state: "ready",
    form: <Form analyzed />,
    children: (
      <ContributionPanel
        speakers={[
          { id: "s1", label: "Speaker 1", seconds: 412, student: "Asha" },
          { id: "s2", label: "Speaker 2", seconds: 268 },
        ]}
        students={["Asha", "Ben"]}
      />
    ),
  },
}
