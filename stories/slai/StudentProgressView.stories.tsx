import type { Meta, StoryObj } from "@storybook/nextjs"

import { StudentProgressView } from "@/components/slai/student-progress-view"
import { LIAM, MEI, SESSION_LABELS } from "./_student-fixtures"

const meta: Meta<typeof StudentProgressView> = {
  title: "SLAI/StudentProgressView",
  component: StudentProgressView,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    sessionLabels: SESSION_LABELS,
    standardLabel: "CCSS",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StudentProgressView>

export const MultilingualLearner: Story = {
  args: {
    student: MEI,
    insight:
      "Mei's WIDA score has climbed from 2.4 to 3.4 across four sessions, with participation holding steady.",
  },
}

export const Warning: Story = {
  args: {
    student: MEI,
    insightVariant: "warning",
    insight:
      "Mei's participation has dropped in the last 2 sessions. A proactive check-in is recommended.",
  },
}

/** No WIDA metric for native English speakers. */
export const NativeEnglish: Story = { args: { student: LIAM } }
