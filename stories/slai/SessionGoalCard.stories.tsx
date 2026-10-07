import type { Meta, StoryObj } from "@storybook/nextjs"

import { SessionGoalCard } from "@/components/slai/session-goal-card"

const meta: Meta<typeof SessionGoalCard> = {
  title: "SLAI/SessionGoalCard",
  component: SessionGoalCard,
  tags: ["autodocs"],
  args: {
    standardCode: "3.OA.A.2",
    languageObjective: "Explain how to share items equally using \"each\" and \"the same\".",
    standardDescription:
      "Interpret whole-number quotients as the number of objects in each share.",
    counts: { met: 2, partial: 1, notYet: 1, total: 4 },
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
type Story = StoryObj<typeof SessionGoalCard>

export const Default: Story = {}

export const Collapsed: Story = { args: { defaultOpen: false } }

/** Zero "partial" / "not yet" counts are left out of the tally. */
export const AllMet: Story = {
  args: { counts: { met: 4, partial: 0, notYet: 0, total: 4 } },
}
