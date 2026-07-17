import type { Meta, StoryObj } from "@storybook/nextjs"

import { Footer } from "@/components/lab-website/footer"

const meta: Meta<typeof Footer> = {
  title: "LabWebsite/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
