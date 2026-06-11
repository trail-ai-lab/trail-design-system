import type { Meta, StoryObj } from "@storybook/nextjs"
import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => <Toggle aria-label="Bold"><Bold /></Toggle>,
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="default" aria-label="Bold"><Bold /></Toggle>
      <Toggle variant="outline" aria-label="Italic"><Italic /></Toggle>
    </div>
  ),
}

export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-1 rounded-lg border border-border p-1">
      <Toggle size="sm" aria-label="Bold"><Bold /></Toggle>
      <Toggle size="sm" aria-label="Italic"><Italic /></Toggle>
      <Toggle size="sm" aria-label="Underline"><Underline /></Toggle>
    </div>
  ),
}
