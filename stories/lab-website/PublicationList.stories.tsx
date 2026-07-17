import type { Meta, StoryObj } from "@storybook/nextjs"

import { PublicationList } from "@/components/lab-website/publication-list"

const meta: Meta<typeof PublicationList> = {
  title: "LabWebsite/PublicationList",
  component: PublicationList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: [
      {
        id: "publication-9",
        title: "Multimodal Analytics for Collaborative Teacher Reflection of Human-AI Hybrid Teaching",
        authors: ["Shamya Karumbaiah"],
        year: "2024",
        publisher: "Proceedings of LAK",
      },
      {
        id: "publication-6",
        title: "Optimizing philosophies for predictive models in learning analytics",
        authors: ["Shane Hutt", "Shamya Karumbaiah", "Joshua Ocumpaugh"],
        year: "2021",
        publisher: "Journal of Educational Data Mining",
      },
    ],
  },
}
export default meta

type Story = StoryObj<typeof PublicationList>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-3xl">
      <PublicationList {...args} />
    </div>
  ),
}
