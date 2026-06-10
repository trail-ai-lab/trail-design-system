import type { Meta, StoryObj } from "@storybook/nextjs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Enter text…",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        aria-invalid="true"
        defaultValue="bad value"
        placeholder="Enter username"
      />
      <p className="text-xs text-destructive">Username is already taken.</p>
    </div>
  ),
}
