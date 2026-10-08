import type { Meta, StoryObj } from "@storybook/react-vite"

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

/** `title` adds a bold first line, e.g. for system warnings like noisy audio. */
export const WithTitle: Story = {
  args: {
    variant: "warning",
    title: "Audio may be too noisy",
    children:
      "Transcription accuracy may suffer. Move to a quieter spot or closer to the microphone.",
  },
}
