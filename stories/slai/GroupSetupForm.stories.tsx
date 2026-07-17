import type { Meta, StoryObj } from "@storybook/nextjs"

import { GroupSetupForm } from "@/components/slai/group-setup-form"

const meta: Meta<typeof GroupSetupForm> = {
  title: "SLAI/GroupSetupForm",
  component: GroupSetupForm,
  tags: ["autodocs"],
  args: {
    className: "w-full max-w-sm",
  },
}

export default meta
type Story = StoryObj<typeof GroupSetupForm>

export const Default: Story = {}
