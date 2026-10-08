import type { Meta, StoryObj } from "@storybook/react-vite"

import { SignupForm } from "@/components/patterns/signup-form"

const meta: Meta<typeof SignupForm> = {
  title: "Patterns/Auth/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { onSubmit: () => {}, onGoogle: () => {}, loginHref: "#" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SignupForm>

export const Default: Story = {}

export const Creating: Story = { args: { loading: true } }

export const WithError: Story = {
  args: { error: "An account with this email already exists." },
}
