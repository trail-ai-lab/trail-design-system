import type { Meta, StoryObj } from "@storybook/nextjs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-56">
      <Label htmlFor="session">Session name</Label>
      <Input id="session" placeholder="Town Hall Q2" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-56">
      <Label htmlFor="required">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="required" type="email" placeholder="user@traillab.ai" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-56 opacity-50">
      <Label htmlFor="dis">Disabled field</Label>
      <Input id="dis" disabled placeholder="Not editable" />
    </div>
  ),
}
