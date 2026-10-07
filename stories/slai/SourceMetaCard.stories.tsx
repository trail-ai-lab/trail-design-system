import type { Meta, StoryObj } from "@storybook/nextjs"

import { SourceMetaCard } from "@/components/slai/source-meta-card"

const meta: Meta<typeof SourceMetaCard> = {
  title: "SLAI/SourceMetaCard",
  component: SourceMetaCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    fileName: "inclined-plane-lab.webm",
    recordedAt: "Aug 21, 3:42 PM",
    duration: "24:13",
    size: "4.2 MB",
    group: "Group 1",
    activity: "Forces and Motion",
    students: ["Asha", "Ben", "Chen"],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SourceMetaCard>

export const Default: Story = {}

/** Rows without a value are skipped. */
export const QuickRecording: Story = {
  args: { group: undefined, activity: undefined, students: undefined },
}
