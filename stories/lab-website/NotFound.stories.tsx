import type { Meta, StoryObj } from "@storybook/nextjs"

import { NotFound } from "@/components/lab-website/not-found"

const meta: Meta<typeof NotFound> = {
  title: "LabWebsite/NotFound",
  component: NotFound,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof NotFound>

export const Default: Story = {}
