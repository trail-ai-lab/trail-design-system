import type { Meta, StoryObj } from "@storybook/react-vite"

import { PartnerDebriefCard } from "@/components/clue-ai/partner-debrief-card"
import { QUINN, RILEY } from "./_ai-partner-fixtures"

const meta: Meta<typeof PartnerDebriefCard> = {
  title: "ClueAI/PartnerDebriefCard",
  component: PartnerDebriefCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-2xl max-w-full">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PartnerDebriefCard>

export const Defensive: Story = {
  args: {
    partner: QUINN,
    behavior: "defensive",
    stats: {
      proposals: 9,
      accepted: 2,
      changedMind: 0,
      teamCorrect: 10,
      totalSentences: 12,
    },
  },
}

export const Reasonable: Story = {
  args: {
    partner: RILEY,
    behavior: "reasonable",
    stats: {
      proposals: 5,
      accepted: 4,
      changedMind: 2,
      teamCorrect: 11,
      totalSentences: 12,
    },
  },
}
