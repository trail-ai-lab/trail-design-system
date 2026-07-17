import type { Meta, StoryObj } from "@storybook/nextjs"

import { RecentNews } from "@/components/lab-website/recent-news"

const meta: Meta<typeof RecentNews> = {
  title: "LabWebsite/RecentNews",
  component: RecentNews,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "§ 03 · News",
    title: "Recent news.",
    description: "Talks, papers, panels, awards. The work in motion.",
    viewAllHref: "/news",
    totalCount: 68,
    items: [
      { date: "Jul 24, 2025", text: "Alina Guha presented at the Artificial Intelligence in Education conference." },
      { date: "2024", text: "Shamya Karumbaiah publishes on optimizing predictive model philosophies." },
    ],
  },
}
export default meta

type Story = StoryObj<typeof RecentNews>

export const Default: Story = {}
