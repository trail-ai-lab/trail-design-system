import type { Meta, StoryObj } from "@storybook/nextjs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="accept" />
      <Label htmlFor="accept">Accept terms and conditions</Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" defaultChecked />
        <Label htmlFor="c1">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" />
        <Label htmlFor="c2">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" disabled />
        <Label htmlFor="c3">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" disabled defaultChecked />
        <Label htmlFor="c4">Disabled checked</Label>
      </div>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">Select tools</Label>
      {["SLAI", "AIBAT", "Casting Lab", "Bias Audit"].map((tool) => (
        <div key={tool} className="flex items-center gap-2">
          <Checkbox id={tool} />
          <Label htmlFor={tool}>{tool}</Label>
        </div>
      ))}
    </div>
  ),
}
