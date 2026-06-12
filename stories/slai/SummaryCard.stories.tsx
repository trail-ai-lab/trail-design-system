import type { Meta, StoryObj } from "@storybook/nextjs"

import { SummaryCard } from "@/components/slai/summary-card"

const meta: Meta<typeof SummaryCard> = {
  title: "SLAI/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SummaryCard>

export const Empty: Story = {
  args: { scopeLabel: "Group 1" },
}

export const WithSummary: Story = {
  args: {
    scopeLabel: "Group 1",
    summary:
      "Group 1 is testing how ramp angle affects ball speed. They connected steeper ramps to greater acceleration and are designing a three-angle comparison.",
  },
}

export const AllGroups: Story = {
  args: {
    scopeLabel: "All groups",
    summary:
      "Both groups are investigating how ramp angle affects ball speed. Group 1 is timing runs across three angles; Group 2 is establishing a flat baseline first.",
  },
}

export const Loading: Story = {
  args: { scopeLabel: "Group 1", loading: true },
}
