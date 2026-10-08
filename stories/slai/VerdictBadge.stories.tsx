import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  VerdictBadge,
  VerdictIcon,
  VerdictLegend,
} from "@/components/slai/verdict-badge"

const meta: Meta<typeof VerdictBadge> = {
  title: "SLAI/VerdictBadge",
  component: VerdictBadge,
  tags: ["autodocs"],
  args: { label: "CCSS", verdict: "met" },
}

export default meta
type Story = StoryObj<typeof VerdictBadge>

export const Met: Story = {}

export const Partial: Story = { args: { verdict: "partial" } }

export const NotYet: Story = { args: { verdict: "not-yet" } }

export const WithScoreAndNote: Story = {
  args: { label: "WIDA", verdict: "partial", score: 3.2, note: "in Spanish" },
}

/** Hover for the reasoning tooltip. */
export const WithReasoning: Story = {
  args: {
    label: "WIDA",
    verdict: "met",
    score: 4.1,
    reasoning: "Explains the strategy in complete sentences with few prompts.",
  },
}

export const AllVerdicts: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <div className="flex gap-2">
        <VerdictBadge label="CCSS" verdict="met" />
        <VerdictBadge label="CCSS" verdict="partial" />
        <VerdictBadge label="CCSS" verdict="not-yet" />
      </div>
      <div className="flex gap-2">
        <VerdictIcon verdict="met" />
        <VerdictIcon verdict="partial" />
        <VerdictIcon verdict="not-yet" />
      </div>
      <VerdictLegend />
    </div>
  ),
}
