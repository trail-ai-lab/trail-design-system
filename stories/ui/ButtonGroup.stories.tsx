import type { Meta, StoryObj } from "@storybook/nextjs"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "UI/ButtonGroup",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Option A</Button>
      <Button variant="outline">Option B</Button>
      <Button variant="outline">Option C</Button>
    </ButtonGroup>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon"><AlignLeft /></Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon"><AlignCenter /></Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon"><AlignRight /></Button>
    </ButtonGroup>
  ),
}
