import type { Meta, StoryObj } from "@storybook/nextjs"

import { ResearchCard } from "@/components/lab-website/research-card"

const meta: Meta<typeof ResearchCard> = {
  title: "LabWebsite/ResearchCard",
  component: ResearchCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    research: {
      index: "01",
      title: "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
      funders: ["NSF", "Google"],
      href: "/research/research-1",
    },
  },
}
export default meta

type Story = StoryObj<typeof ResearchCard>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <ResearchCard {...args} />
    </div>
  ),
}
