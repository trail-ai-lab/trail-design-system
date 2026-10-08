import type { Meta, StoryObj } from "@storybook/react-vite"
import { AudioLinesIcon } from "lucide-react"

import { TranscriptUtteranceRow } from "@/components/slai/transcript-utterance-row"

const Leading = (
  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
    <AudioLinesIcon className="size-3.5 text-muted-foreground" />
  </div>
)

const meta: Meta<typeof TranscriptUtteranceRow> = {
  title: "SLAI/TranscriptUtteranceRow",
  component: TranscriptUtteranceRow,
  tags: ["autodocs"],
  args: {
    leading: Leading,
    entry: {
      timestamp: "3:42 PM",
      language: "Marathi",
      original: "आपण हे एकत्र सोडवूया.",
      translation: "Let's solve this together.",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TranscriptUtteranceRow>

export const Default: Story = {}

export const WithMeta: Story = {
  args: {
    meta: <span className="font-medium text-foreground">Student 1</span>,
  },
}

export const NoTranslation: Story = {
  args: {
    entry: { timestamp: "3:43 PM", language: "English", original: "I agree." },
  },
}

export const IdenticalTranslationHidden: Story = {
  args: {
    entry: {
      language: "English",
      original: "Same text",
      translation: "Same text",
    },
  },
}
