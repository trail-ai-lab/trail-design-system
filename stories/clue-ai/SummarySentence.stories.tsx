import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummarySentence } from "@/components/clue-ai/summary-sentence"

const TEXT =
  "She expressed aggressive intent in a voicemail to her friend the same day of the murder: “I hate him. I swear, if I had it in me, I'd kill him.”"

const meta: Meta<typeof SummarySentence> = {
  title: "ClueAI/SummarySentence",
  component: SummarySentence,
  tags: ["autodocs"],
  args: { index: 2, text: TEXT, onCheckSource: () => {} },
  decorators: [
    (Story) => (
      <ol className="w-full max-w-2xl">
        <Story />
      </ol>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SummarySentence>

export const Unclassified: Story = {}
export const Classified: Story = { args: { defaultValue: "hallucination" } }
export const ViewingSource: Story = {
  args: { defaultValue: "hallucination", isActive: true },
}
export const Locked: Story = {
  args: { defaultValue: "misrepresentation", disabled: true },
}
export const NoSource: Story = { args: { onCheckSource: undefined } }
export const AnswerCorrect: Story = {
  args: { value: "hallucination", answer: "hallucination" },
}
export const AnswerWrong: Story = {
  args: { value: "accurate", answer: "hallucination" },
}
export const AnswerSkipped: Story = {
  args: { value: null, answer: "hallucination" },
}
