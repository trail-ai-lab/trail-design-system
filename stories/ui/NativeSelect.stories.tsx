import type { Meta, StoryObj } from "@storybook/nextjs"
import { NativeSelect } from "@/components/ui/native-select"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof NativeSelect> = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-56">
      <Label htmlFor="tool">Tool</Label>
      <NativeSelect id="tool">
        <option value="">Select a tool…</option>
        <option value="slai">SLAI</option>
        <option value="aibat">AIBAT</option>
        <option value="casting-lab">Casting Lab</option>
        <option value="bias-audit">Bias Audit</option>
      </NativeSelect>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled className="w-56">
      <option>Disabled select</option>
    </NativeSelect>
  ),
}
