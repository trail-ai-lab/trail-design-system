import type { Meta, StoryObj } from "@storybook/react-vite"

import { DetailList } from "@/components/patterns/detail-list"

const meta: Meta<typeof DetailList> = {
  title: "Patterns/DetailList",
  component: DetailList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: "Name", value: "Team Alpha" },
      { label: "Duration", value: "00:12:34" },
      { label: "Size", value: "4.2 MB" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof DetailList>

export const Default: Story = {}

/** Long values wrap instead of pushing the label out. */
export const LongValue: Story = {
  args: {
    items: [
      { label: "Name", value: "physics-period-3-team-alpha-ramp-angles.webm" },
      { label: "Size", value: "4.2 MB" },
    ],
  },
}
