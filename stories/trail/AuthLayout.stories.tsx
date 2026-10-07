import type { Meta, StoryObj } from "@storybook/nextjs"

import { AuthAside, AuthLayout } from "@/components/trail/auth-layout"
import { LoginForm } from "@/components/trail/login-form"

const TOOLS = [
  { name: "AIBAT", href: "#" },
  { name: "Casting Lab", href: "#" },
  { name: "Murder Mystery", href: "#" },
]

const aside = (
  <AuthAside
    toolName="SLAI"
    title="Bridging Science and Language using AI"
    tagline="Real-time transcription and insight for multilingual science classrooms."
    homeHref="#"
    tools={TOOLS}
  />
)

const meta: Meta<typeof AuthLayout> = {
  title: "Trail/Auth/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AuthLayout>

/** Split screen on large viewports; the aside is hidden below `lg`. */
export const Login: Story = {
  args: {
    aside,
    children: (
      <LoginForm onSubmit={() => {}} onGoogle={() => {}} forgotPasswordHref="#" signupHref="#" />
    ),
  },
}

export const WithoutAside: Story = {
  args: {
    children: <LoginForm onSubmit={() => {}} />,
  },
}

export const AsideOnly: Story = {
  render: () => <div className="h-svh w-full max-w-xl">{aside}</div>,
}
