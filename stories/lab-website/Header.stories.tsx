import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { ROUTES } from "@/components/lab-website/lib/routes"

const meta: Meta<typeof Header> = {
  title: "LabWebsite/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { routes: ROUTES, activePath: "/research" },
}
export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {}
