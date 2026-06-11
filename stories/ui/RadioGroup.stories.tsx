import type { Meta, StoryObj } from "@storybook/nextjs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="slai">
      {["SLAI", "AIBAT", "Bias Audit"].map((tool) => (
        <div key={tool} className="flex items-center gap-2">
          <RadioGroupItem value={tool.toLowerCase().replace(" ", "-")} id={tool} />
          <Label htmlFor={tool}>{tool}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-a" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-a" id="da" />
        <Label htmlFor="da">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-b" id="db" />
        <Label htmlFor="db">Option B (disabled)</Label>
      </div>
    </RadioGroup>
  ),
}
