import type { Meta, StoryObj } from "@storybook/react-vite"
import { LockIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AiSummaryCard } from "@/components/clue-ai/ai-summary-card"
import {
  FLORA_ANSWERS,
  FLORA_IN_PROGRESS,
  FLORA_SENTENCES,
  FLORA_YOURS,
} from "./_case-fixtures"

const meta: Meta<typeof AiSummaryCard> = {
  title: "ClueAI/AiSummaryCard",
  component: AiSummaryCard,
  tags: ["autodocs"],
  args: {
    suspectName: "Flora",
    sentences: FLORA_SENTENCES,
    onCheckSource: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AiSummaryCard>

export const NotStarted: Story = {}

export const InProgress: Story = {
  args: { defaultValue: FLORA_IN_PROGRESS, activeSentenceId: "fl_2" },
}

export const Locked: Story = {
  args: {
    defaultValue: FLORA_IN_PROGRESS,
    disabled: true,
    notice: (
      <Alert>
        <LockIcon />
        <AlertTitle>Solo analysis is over</AlertTitle>
        <AlertDescription>
          Your picks are locked. Submit your verdict to compare with Mia.
        </AlertDescription>
      </Alert>
    ),
  },
}

export const AnswerKey: Story = {
  args: { value: FLORA_YOURS, answers: FLORA_ANSWERS },
}
