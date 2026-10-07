import type { Meta, StoryObj } from "@storybook/nextjs"

import { CheckinDivider } from "@/components/slai/checkin-divider"

const meta: Meta<typeof CheckinDivider> = {
  title: "SLAI/CheckinDivider",
  component: CheckinDivider,
  tags: ["autodocs"],
  args: { time: "10:42 AM" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CheckinDivider>

export const Default: Story = {}

export const WithoutTime: Story = { args: { time: undefined } }
