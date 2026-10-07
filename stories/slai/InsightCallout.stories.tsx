import type { Meta, StoryObj } from "@storybook/nextjs"

import { InsightCallout } from "@/components/slai/insight-callout"

const meta: Meta<typeof InsightCallout> = {
  title: "SLAI/InsightCallout",
  component: InsightCallout,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof InsightCallout>

export const Info: Story = {
  args: {
    children:
      "Mei's WIDA score has climbed steadily over three sessions — keep the momentum.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children:
      "Rosa's participation has dropped sharply in the last 2 sessions. A check-in before the next session is recommended.",
  },
}
