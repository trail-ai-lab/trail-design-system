import type { Meta, StoryObj } from "@storybook/nextjs"

import { Hero } from "@/components/lab-website/hero"

const meta: Meta<typeof Hero> = {
  title: "LabWebsite/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "The Responsible AI for Learning Lab · UW–Madison",
    title: "We ask where and whether AI belongs in classrooms.",
    description:
      "TRAIL Lab is an interdisciplinary research group studying the responsible use of AI in real-world classrooms.",
    primaryAction: { label: "Explore the research", href: "/research" },
    secondaryAction: { label: "Read the work", href: "/publications" },
    meta: [
      { label: "PI", value: "Shamya Karumbaiah" },
      { label: "Established", value: "2023 · Madison, WI" },
    ],
  },
}
export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {}
