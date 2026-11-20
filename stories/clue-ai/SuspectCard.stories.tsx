import type { Meta, StoryObj } from "@storybook/react-vite"

import { SuspectCard } from "@/components/clue-ai/suspect-card"
import { suspect } from "./_case-fixtures"

const meta: Meta<typeof SuspectCard> = {
  title: "ClueAI/SuspectCard",
  component: SuspectCard,
  tags: ["autodocs"],
  args: { onSelect: () => {} },
  argTypes: {
    status: {
      control: "select",
      options: ["required", "available", "in-progress", "completed", "locked"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SuspectCard>

export const Required: Story = {
  args: { suspect: suspect("flora"), status: "required", sentenceCount: 12 },
}
export const Available: Story = {
  args: { suspect: suspect("cecilia"), status: "available", sentenceCount: 10 },
}
export const InProgress: Story = {
  args: { suspect: suspect("eddie"), status: "in-progress", sentenceCount: 7 },
}
export const Completed: Story = {
  args: {
    suspect: suspect("flora"),
    status: "completed",
    sentenceCount: 12,
    score: 9,
    verdict: { verdict: "inconclusive" },
  },
}
export const CompletedGuilty: Story = {
  args: {
    suspect: suspect("eddie"),
    status: "completed",
    sentenceCount: 7,
    score: 6,
    verdict: { verdict: "guilty", motive: "Covering up embezzlement" },
  },
}
export const Locked: Story = {
  args: {
    suspect: suspect("ferris"),
    status: "locked",
    sentenceCount: 8,
    lockedReason: "Finish Flora first",
  },
}
export const NoPortrait: Story = {
  args: {
    suspect: { ...suspect("cecilia"), portraitUrl: undefined },
    status: "available",
    sentenceCount: 10,
  },
}
