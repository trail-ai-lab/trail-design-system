import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummaryQaPanel } from "@/components/slai/summary-qa-panel"

const meta: Meta<typeof SummaryQaPanel> = {
  title: "SLAI/SummaryQaPanel",
  component: SummaryQaPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-[560px] w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    className: "h-full",
    summary: {
      scopeLabel: "Group 1",
      summary:
        "The group compared three ramp angles and concluded that steeper ramps accelerate the ball more.",
    },
    chat: {
      scopeLabel: "Group 1",
      messages: [
        { id: "1", role: "user", content: "Who contributed the most?" },
        {
          id: "2",
          role: "assistant",
          content:
            "Aarav led the reasoning (42% of turns); Jordan ran the timing.",
        },
      ],
    },
  },
}
export default meta
type Story = StoryObj<typeof SummaryQaPanel>

export const SummaryTab: Story = {}

export const QaTab: Story = { args: { defaultValue: "qa" } }
