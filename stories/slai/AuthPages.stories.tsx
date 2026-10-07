import type { Meta, StoryObj } from "@storybook/nextjs"

import { AuthAside, AuthLayout } from "@/components/trail/auth-layout"
import { ForgotPasswordForm } from "@/components/trail/forgot-password-form"
import { LoginForm } from "@/components/trail/login-form"
import { ResetPasswordCard } from "@/components/trail/reset-password-card"
import { SignupForm } from "@/components/trail/signup-form"
import { VerifyEmailCard } from "@/components/trail/verify-email-card"

const ASIDE = (
  <AuthAside
    toolName="SLAI"
    title="Bridging Science and Language using AI"
    tagline="Real-time transcription and insight for multilingual science classrooms."
    homeHref="#"
    tools={[
      { name: "AIBAT", href: "#" },
      { name: "Casting Lab", href: "#" },
    ]}
  />
)

const meta: Meta = {
  title: "SLAI/Pages/Auth",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Login: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <LoginForm onSubmit={() => {}} onGoogle={() => {}} forgotPasswordHref="#" signupHref="#" />
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

export const ForgotPassword: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <ForgotPasswordForm onSubmit={() => {}} loginHref="#" />
    </AuthLayout>
  ),
}

export const ResetPassword: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <ResetPasswordCard status="ready" onSubmit={() => {}} />
    </AuthLayout>
  ),
}

export const VerifyEmail: Story = {
  render: () => (
    <AuthLayout aside={ASIDE}>
      <VerifyEmailCard email="teacher@school.edu" sentOnce cooldownSeconds={24} />
    </AuthLayout>
  ),
}
