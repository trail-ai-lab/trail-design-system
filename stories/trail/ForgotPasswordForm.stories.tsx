import type { Meta, StoryObj } from "@storybook/nextjs"

import { ForgotPasswordForm } from "@/components/trail/forgot-password-form"

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Trail/Auth/ForgotPasswordForm",
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
