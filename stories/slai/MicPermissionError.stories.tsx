import type { Meta, StoryObj } from "@storybook/nextjs"

import { MicPermissionError } from "@/components/slai/mic-permission-error"

const meta: Meta<typeof MicPermissionError> = {
  title: "SLAI/MicPermissionError",
  component: MicPermissionError,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    className: "w-full max-w-sm",
  },
}

export default meta
type Story = StoryObj<typeof MicPermissionError>

export const Default: Story = {}
