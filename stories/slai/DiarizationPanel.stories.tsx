import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { ContributionPanel } from "@/components/slai/contribution-panel"
import { DiarizationPanel } from "@/components/slai/diarization-panel"
import { RecordedTranscriptCard } from "@/components/slai/recorded-transcript-card"
import { SpeakerForm } from "@/components/slai/speaker-form"

const meta: Meta<typeof DiarizationPanel> = {
  title: "SLAI/DiarizationPanel",
  component: DiarizationPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { scopeLabel: "Group 1" },
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
  <SpeakerForm defaultSpeakerCount={3} {...props} />
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

/** Results as subsections of the one Speakers card: the `embedded`
 * ContributionPanel and RecordedTranscriptCard. The card's content scrolls. */
export const Ready: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-150 flex-col">
        <Story />
      </div>
    ),
  ],
  args: {
    state: "ready",
    form: <Form analyzed />,
    children: [
      <ContributionPanel
        key="time"
        variant="embedded"
        speakers={[
          { id: "s1", label: "Speaker 1", seconds: 412, student: "Asha" },
          { id: "s2", label: "Speaker 2", seconds: 268 },
        ]}
        students={["Asha", "Ben"]}
      />,
      <RecordedTranscriptCard
        key="transcript"
        variant="embedded"
        manageSpeakers={false}
        speakers={[
          { id: "s1", name: "Asha" },
          { id: "s2", name: "" },
        ]}
        entries={[
          {
            id: "e1",
            speakerId: "s1",
            timestamp: "0:04",
            language: "English",
            original: "So the ramp angle changes how fast it goes, right?",
          },
          {
            id: "e2",
            speakerId: "s2",
            timestamp: "0:11",
            language: "Spanish",
            original: "Sí, si el ángulo es mayor, baja más rápido.",
            translation: "Yes, if the angle is bigger, it goes down faster.",
          },
          {
            id: "e3",
            speakerId: "s1",
            timestamp: "0:19",
            original: "Let's measure it with the stopwatch.",
          },
        ]}
      />,
    ],
  },
}
