import type { Meta, StoryObj } from "@storybook/nextjs"
import { Badge } from "@/components/ui/badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: "Badge" },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Live</Badge>
      <Badge variant="secondary">Recording</Badge>
      <Badge variant="outline">Upcoming</Badge>
      <Badge variant="destructive">Flagged</Badge>
    </div>
  ),
}
