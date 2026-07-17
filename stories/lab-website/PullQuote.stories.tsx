import type { Meta, StoryObj } from "@storybook/nextjs"

import { PullQuote } from "@/components/lab-website/pull-quote"

const meta: Meta<typeof PullQuote> = {
  title: "LabWebsite/PullQuote",
  component: PullQuote,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "A defining stance",
    quote:
      "Should AI be in education at all? That is the question we are willing to answer no to.",
    cite: "TRAIL Lab — research stance",
  },
}
export default meta

type Story = StoryObj<typeof PullQuote>

export const Default: Story = {}
