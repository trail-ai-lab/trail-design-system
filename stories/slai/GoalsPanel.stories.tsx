import type { Meta, StoryObj } from "@storybook/nextjs"

import { GoalsPanel } from "@/components/slai/goals-panel"
import { INSIGHTS } from "./_student-fixtures"

const meta: Meta<typeof GoalsPanel> = {
  title: "SLAI/GoalsPanel",
  component: GoalsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    standardLabel: "CCSS",
    students: INSIGHTS,
    goal: {
      standardCode: "3.OA.A.2",
      languageObjective: "Explain equal sharing using \"each\".",
      standardDescription:
        "Interpret whole-number quotients as the number of objects in each share.",
    },
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
type Story = StoryObj<typeof GoalsPanel>

/** Students below the bar are listed first, and the first card starts open. */
export const Default: Story = {}

export const WithGroupCallout: Story = {
  args: {
    callout: "Group 2 reached the objective together after switching to Spanish.",
  },
}

export const Empty: Story = { args: { students: [] } }
