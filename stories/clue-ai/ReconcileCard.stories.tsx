import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { ReconcileCard } from "@/components/clue-ai/reconcile-card"
import {
  FLORA_ANSWERS,
  FLORA_PICKS,
  FLORA_SENTENCES,
  PLAYERS,
  YOU,
  PARTNER,
} from "./_case-fixtures"
import { SCENARIOS, aiPicks, aiRationales } from "./_ai-partner-fixtures"

const meta: Meta<typeof ReconcileCard> = {
  title: "ClueAI/ReconcileCard",
  component: ReconcileCard,
  tags: ["autodocs"],
  args: {
    suspectName: "Flora",
    sentences: FLORA_SENTENCES,
    players: PLAYERS,
    picks: FLORA_PICKS,
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
type Story = StoryObj<typeof ReconcileCard>

export const Disagreements: Story = {
  args: {
    activeSentenceId: "fl_10",
    footer: <Button>Continue to team verdict</Button>,
  },
}

export const AllSentences: Story = { args: { defaultFilter: "all" } }

export const FullAgreement: Story = {
  args: {
    picks: Object.fromEntries(
      FLORA_SENTENCES.map((s) => [
        s.id,
        { [YOU.id]: FLORA_ANSWERS[s.id], [PARTNER.id]: FLORA_ANSWERS[s.id] },
      ])
    ),
  },
}

export const Locked: Story = { args: { disabled: true, defaultFilter: "all" } }

/** With an AI teammate that marked every sentence accurate: its reasoning
 * shows under each pick, and Discuss raises the sentence in chat. */
export const WithAiTeammate: Story = {
  args: {
    players: SCENARIOS.defensive.team,
    picks: aiPicks(SCENARIOS.defensive),
    rationales: aiRationales(SCENARIOS.defensive),
    discussingSentenceId: "fl_11",
    onDiscuss: () => {},
    onOpenDocument: () => {},
  },
}
