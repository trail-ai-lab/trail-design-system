import type { Meta, StoryObj } from "@storybook/nextjs"

import { GoogleButton } from "@/components/trail/google-button"

const meta: Meta<typeof GoogleButton> = {
  title: "Trail/Auth/GoogleButton",
  component: GoogleButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GoogleButton>

export const Default: Story = {}

export const Loading: Story = { args: { loading: true } }

export const Disabled: Story = { args: { disabled: true } }
