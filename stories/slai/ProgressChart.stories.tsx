import type { Meta, StoryObj } from "@storybook/nextjs"

import { ProgressChart } from "@/components/slai/progress-chart"
import { LIAM, MEI, SESSION_LABELS } from "./_student-fixtures"

const meta: Meta<typeof ProgressChart> = {
  title: "SLAI/ProgressChart",
  component: ProgressChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    sessions: MEI.sessions,
    sessionLabels: SESSION_LABELS,
    standardLabel: "CCSS",
    metric: "wida",
    studentName: "Mei",
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
type Story = StoryObj<typeof ProgressChart>

/** Mei missed session 4, so the line has a gap joined by a dashed connector. */
export const Wida: Story = {}

export const StandardsGoal: Story = { args: { metric: "standard" } }

export const Participation: Story = { args: { metric: "participation" } }

export const AcademicLanguage: Story = { args: { metric: "academic" } }

export const NativeEnglishNoWida: Story = {
  args: {
    sessions: LIAM.sessions,
    metric: "wida",
    isNativeEnglish: true,
    studentName: "Liam",
  },
}
