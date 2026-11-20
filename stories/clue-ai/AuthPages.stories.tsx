import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthAside, AuthLayout } from "@/components/patterns/auth-layout"
import { LoginForm } from "@/components/patterns/login-form"
import { SignupForm } from "@/components/patterns/signup-form"

const ASIDE = (
  <AuthAside
    toolName="Clue AI"
    title="Can you out-think the AI?"
    tagline="Check an AI's case summaries line by line with a partner, and find the murderer it missed."
    homeHref="#"
    tools={[
      { name: "SLAI", href: "#" },
      { name: "AIBAT", href: "#" },
      { name: "Casting Lab", href: "#" },
    ]}
  />
)

const meta: Meta = {
  title: "ClueAI/Pages/Auth",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Login: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <LoginForm
        onSubmit={() => {}}
        onGoogle={() => {}}
        forgotPasswordHref="#"
        signupHref="#"
      />
    </AuthLayout>
  ),
}

export const Signup: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <SignupForm onSubmit={() => {}} onGoogle={() => {}} loginHref="#" />
    </AuthLayout>
  ),
}
