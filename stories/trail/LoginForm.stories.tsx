import type { Meta, StoryObj } from "@storybook/nextjs"

import { LoginForm } from "@/components/trail/login-form"

const meta: Meta<typeof LoginForm> = {
  title: "Trail/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    onSubmit: () => {},
    onGoogle: () => {},
    forgotPasswordHref: "#",
    signupHref: "#",
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}

export const SigningIn: Story = { args: { loading: true } }

export const GoogleLoading: Story = { args: { googleLoading: true } }

export const WithError: Story = {
  args: { error: "Incorrect email or password." },
}

export const WithoutGoogle: Story = { args: { onGoogle: undefined } }
