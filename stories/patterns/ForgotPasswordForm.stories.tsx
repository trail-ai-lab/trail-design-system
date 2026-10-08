import type { Meta, StoryObj } from "@storybook/react-vite"

import { ForgotPasswordForm } from "@/components/patterns/forgot-password-form"

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Patterns/Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { onSubmit: () => {}, loginHref: "#" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ForgotPasswordForm>

export const Idle: Story = {}

export const Sending: Story = { args: { status: "sending" } }

export const Sent: Story = { args: { status: "sent" } }

export const WithError: Story = {
  args: { error: "Too many requests. Try again in a few minutes." },
}
