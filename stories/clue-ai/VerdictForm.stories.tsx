import type { Meta, StoryObj } from "@storybook/react-vite"

import { VerdictForm } from "@/components/clue-ai/verdict-form"
import { MOTIVES, PARTNER, YOU } from "./_case-fixtures"

const meta: Meta<typeof VerdictForm> = {
  title: "ClueAI/VerdictForm",
  component: VerdictForm,
  tags: ["autodocs"],
  args: { suspectName: "Eddie", motives: MOTIVES, onSubmit: () => {} },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VerdictForm>

export const Empty: Story = {}

export const GuiltyNeedsMotive: Story = {
  args: { defaultValue: { verdict: "guilty" } },
}

export const Inconclusive: Story = {
  args: { defaultValue: { verdict: "inconclusive" } },
}

/** Flora's verdict takes no motive. */
export const NoMotive: Story = {
  args: { suspectName: "Flora", motives: undefined },
}

export const NotReady: Story = {
  args: {
    disabled: true,
    disabledReason: "Classify all 7 sentences to submit your verdict.",
  },
}

export const Submitting: Story = {
  args: {
    defaultValue: { verdict: "guilty", motive: "embezzlement" },
    loading: true,
  },
}

export const TeamAgree: Story = {
  args: {
    picks: [
      { player: YOU, verdict: "guilty", motive: "embezzlement" },
      { player: PARTNER, verdict: "guilty", motive: "embezzlement" },
    ],
    defaultValue: { verdict: "guilty", motive: "embezzlement" },
  },
}

export const TeamDisagree: Story = {
  args: {
    picks: [
      { player: YOU, verdict: "guilty", motive: "embezzlement" },
      { player: PARTNER, verdict: "inconclusive" },
    ],
  },
}
