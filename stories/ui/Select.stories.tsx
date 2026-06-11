import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const meta: Meta = {
  title: "UI/Select",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a tool" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="slai">SLAI</SelectItem>
        <SelectItem value="aibat">AIBAT</SelectItem>
        <SelectItem value="casting-lab">Casting Lab</SelectItem>
        <SelectItem value="murder-mystery">Murder Mystery</SelectItem>
        <SelectItem value="trail-console">Trail Console</SelectItem>
        <SelectItem value="bias-audit">Bias Audit</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-48">
      <Label htmlFor="tool-select">Active tool</Label>
      <Select>
        <SelectTrigger id="tool-select">
          <SelectValue placeholder="Choose…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="slai">SLAI</SelectItem>
          <SelectItem value="aibat">AIBAT</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">Item</SelectItem>
      </SelectContent>
    </Select>
  ),
}
