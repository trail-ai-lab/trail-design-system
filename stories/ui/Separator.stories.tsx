import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "@/components/ui/separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <p className="text-sm">Above the separator</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Below the separator</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">SLAI</span>
      <Separator orientation="vertical" />
      <span className="text-sm">AIBAT</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Bias Audit</span>
    </div>
  ),
}
