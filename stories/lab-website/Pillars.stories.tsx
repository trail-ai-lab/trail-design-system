import type { Meta, StoryObj } from "@storybook/nextjs"
import { BookOpen, LineChart, ShieldCheck, Users } from "lucide-react"

import { Pillars } from "@/components/lab-website/pillars"

const meta: Meta<typeof Pillars> = {
  title: "LabWebsite/Pillars",
  component: Pillars,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "§ 01 · Disciplines",
    title: "Four disciplines we focus on",
    items: [
      { icon: BookOpen, index: "01", title: "Learning Sciences", body: "Understanding how people learn across cognition, culture, and context." },
      { icon: ShieldCheck, index: "02", title: "AI Ethics", body: "Addressing bias, privacy, and equity concerns in AI use." },
      { icon: LineChart, index: "03", title: "Learning Analytics", body: "Mining patterns in process data to surface key moments." },
      { icon: Users, index: "04", title: "Human-Centered Design", body: "Co-designing with educators and learners from the get-go." },
    ],
  },
}
export default meta

type Story = StoryObj<typeof Pillars>

export const Default: Story = {}
