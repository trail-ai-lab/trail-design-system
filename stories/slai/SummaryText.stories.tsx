import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummaryText } from "@/components/slai/summary-text"

const meta: Meta<typeof SummaryText> = {
  title: "SLAI/SummaryText",
  component: SummaryText,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SummaryText>

export const Paragraph: Story = {
  args: { text: "Group 1 is testing how ramp angle affects ball speed." },
}

export const Bullets: Story = {
  args: {
    text: "- Compared three ramp angles\n- Connected steeper ramps to faster balls\n- Still deciding how to measure speed",
  },
}

export const Mixed: Story = {
  args: {
    text: "Key points so far:\n- Ramp angle matters\n- Friction was raised\nNext they plan to graph results.",
  },
}
