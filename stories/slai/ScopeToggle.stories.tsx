import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ScopeToggle, type InsightScope } from "@/components/slai/scope-toggle"

const meta: Meta<typeof ScopeToggle> = {
  title: "SLAI/ScopeToggle",
  component: ScopeToggle,
  tags: ["autodocs"],
  args: { value: "group", groupLabel: "Group 1" },
}

export default meta
type Story = StoryObj<typeof ScopeToggle>

export const Default: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState<InsightScope>(args.value)
    return <ScopeToggle {...args} value={value} onValueChange={setValue} />
  },
}
