import type { Meta, StoryObj } from "@storybook/nextjs"
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "UI/InputGroup",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const WithPrefix: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="traillab.ai/session" />
    </InputGroup>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <Search className="size-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search sessions…" />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Paste session URL…" />
      <InputGroupAddon>
        <Button size="sm">Import</Button>
      </InputGroupAddon>
    </InputGroup>
  ),
}
