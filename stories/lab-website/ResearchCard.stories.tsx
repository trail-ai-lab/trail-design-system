import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResearchCard } from "@/components/lab-website/research-card"

const meta: Meta<typeof ResearchCard> = {
  title: "LabWebsite/ResearchCard",
  component: ResearchCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    research: {
      index: "01",
      title:
        "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
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

/** No `href`: a static card with no hover state, for areas without a page yet. */
export const Static: Story = {
  args: {
    research: {
      index: "02",
      title: "Translanguaging in Multilingual Science Classrooms",
      funders: ["NSF"],
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResearchCard {...args} />
    </div>
  ),
}

export const NoFunders: Story = {
  args: {
    research: {
      index: "03",
      title: "Teacher-Facing AI Tools",
      funders: [],
      href: "/research/research-3",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResearchCard {...args} />
    </div>
  ),
}
