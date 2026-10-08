import type { Meta, StoryObj } from "@storybook/react-vite"

import { StudentInsightCard } from "@/components/slai/student-insight-card"
import { INSIGHTS } from "./_student-fixtures"

const meta: Meta<typeof StudentInsightCard> = {
  title: "SLAI/StudentInsightCard",
  component: StudentInsightCard,
  tags: ["autodocs"],
  args: { standardLabel: "CCSS", maxTalkTimePct: 46 },
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

/** Below the bar on a measure: emphasized border. */
export const NeedsAttention: Story = {
  args: { student: INSIGHTS[0], defaultOpen: true },
}

export const Collapsed: Story = { args: { student: INSIGHTS[2] } }

export const NativeEnglish: Story = {
  args: { student: INSIGHTS[1], defaultOpen: true },
}

export const NoAcademicLanguage: Story = {
  args: {
    student: { ...INSIGHTS[2], academicTerms: [], culturalContext: undefined },
    defaultOpen: true,
  },
}
