import type { Meta, StoryObj } from "@storybook/react-vite"
import { ShapesIcon } from "lucide-react"

import { IconTile } from "@/components/patterns/icon-tile"

const meta: Meta<typeof IconTile> = {
  title: "Patterns/IconTile",
  component: IconTile,
  tags: ["autodocs"],
  args: { children: <ShapesIcon /> },
}

export default meta
type Story = StoryObj<typeof IconTile>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconTile variant="default">
        <ShapesIcon />
      </IconTile>
      <IconTile variant="primary">
        <ShapesIcon />
      </IconTile>
      <IconTile variant="destructive">
        <ShapesIcon />
      </IconTile>
      <IconTile variant="success">
        <ShapesIcon />
      </IconTile>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconTile size="sm">
        <ShapesIcon />
      </IconTile>
      <IconTile size="default">
        <ShapesIcon />
      </IconTile>
      <IconTile size="lg">
        <ShapesIcon />
      </IconTile>
    </div>
  ),
}
