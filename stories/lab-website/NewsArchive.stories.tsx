import type { Meta, StoryObj } from "@storybook/nextjs"

import { NewsArchive } from "@/components/lab-website/news-archive"

const meta: Meta<typeof NewsArchive> = {
  title: "LabWebsite/NewsArchive",
  component: NewsArchive,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: [
      { date: "Jul 24, 2025", text: "Alina Guha presented at the Artificial Intelligence in Education conference." },
      { date: "2024", text: "Shamya Karumbaiah publishes on optimizing predictive model philosophies." },
      { date: "Jan 22, 2018", text: "Shamya Karumbaiah gave an invited talk at Carnegie Mellon University." },
    ],
  },
}
export default meta

type Story = StoryObj<typeof NewsArchive>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-3xl">
      <NewsArchive {...args} />
    </div>
  ),
}
