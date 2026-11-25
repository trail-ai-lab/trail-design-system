import type { Meta, StoryObj } from "@storybook/react-vite"

import { HeaderSwitch } from "@/components/slai/header-switch"

const meta: Meta<typeof HeaderSwitch> = {
  title: "SLAI/HeaderSwitch",
  component: HeaderSwitch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Speakers" },
}

export default meta
type Story = StoryObj<typeof HeaderSwitch>

export const Off: Story = {}

export const On: Story = { args: { defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }

/** A transcript header's view options, side by side. */
export const Row: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HeaderSwitch label="Translation" defaultChecked />
      <HeaderSwitch label="Speakers" />
    </div>
  ),
}
