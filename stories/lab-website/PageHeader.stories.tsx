import type { Meta, StoryObj } from "@storybook/nextjs"

import { PageHeader } from "@/components/lab-website/page-header"

const meta: Meta<typeof PageHeader> = {
  title: "LabWebsite/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Research",
    title: "The questions we are working through.",
    description:
      "Our research spans AI bias auditing, teacher–AI partnership, and the analytics infrastructure needed to study classrooms responsibly.",
  },
}
export default meta

type Story = StoryObj<typeof PageHeader>

export const Default: Story = {}
