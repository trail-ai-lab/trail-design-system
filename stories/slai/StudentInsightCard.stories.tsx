import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { StudentInsightCard } from "@/components/slai/student-insight-card"
import { INSIGHTS, LEGACY_INSIGHTS } from "./_student-fixtures"

const meta: Meta<typeof StudentInsightCard> = {
  title: "SLAI/StudentInsightCard",
  component: StudentInsightCard,
  tags: ["autodocs"],
  args: { standardLabel: "CCSS", maxWords: 212 },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StudentInsightCard>

/** "Not yet": emphasized border. Open, with a translated quote. */
export const NeedsAttention: Story = {
  args: { student: INSIGHTS[0], defaultOpen: true },
}

/** "Met", with two quotes, academic terms and a next step. */
export const Met: Story = { args: { student: INSIGHTS[1], defaultOpen: true } }

export const Collapsed: Story = { args: { student: INSIGHTS[2] } }

/** A WIDA verdict shows beside the standard's when it's measured too. */
export const WithWida: Story = {
  args: { student: INSIGHTS[2], defaultOpen: true },
}

/** No verdict: the badge says why, and with nothing to show the card
 * doesn't open. */
export const NoVerdict: Story = {
  args: { student: INSIGHTS[3] },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("CCSS · Said too little to judge")
    ).toBeVisible()
    await expect(canvas.getByRole("button")).toBeDisabled()
  },
}

/** 3.10 data still works (deprecated): a talk-time share fills the bar, a
 * single `transcriptQuote` shows as the quote, and `wida: null` shows
 * "Native English". */
export const LegacyData: Story = {
  args: { student: LEGACY_INSIGHTS[0], maxTalkTimePct: 42, defaultOpen: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("progressbar", { name: "42% of group talk time" })
    ).toBeVisible()
    await expect(canvas.getByText(/two cups for every three/)).toBeVisible()
    await expect(canvas.getByText("Cultural connection")).toBeVisible()
  },
}

export const LegacyNativeEnglish: Story = {
  args: { student: LEGACY_INSIGHTS[1], maxTalkTimePct: 42 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Native English")).toBeVisible()
  },
}
