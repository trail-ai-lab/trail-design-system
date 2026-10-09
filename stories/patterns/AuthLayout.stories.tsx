import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthAside, AuthLayout } from "@/components/patterns/auth-layout"
import { LoginForm } from "@/components/patterns/login-form"
import { Logo } from "@/components/patterns/logo"

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
  title: "Patterns/Auth/AuthLayout",
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
      <LoginForm
        onSubmit={() => {}}
        onGoogle={() => {}}
        forgotPasswordHref="#"
        signupHref="#"
      />
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

/**
 * `header` (a small logo link, so phones still show the brand) and `footer`
 * (e.g. a consent note) around the form; `description` tailors the card.
 */
export const WithHeaderAndFooter: Story = {
  args: {
    aside,
    header: (
      <a
        href="https://trail.wcer.wisc.edu"
        className="flex items-center gap-2 text-sm font-medium"
      >
        <Logo className="h-5 text-foreground" />
        TRAIL Lab
      </a>
    ),
    footer: (
      <>
        By selecting Sign in or Continue with Google, you acknowledge that your
        usage may be recorded and used for research by the{" "}
        <a
          href="https://trail.wcer.wisc.edu"
          className="underline underline-offset-4"
        >
          TRAIL Lab
        </a>{" "}
        at UW–Madison.
      </>
    ),
    children: (
      <LoginForm
        description="Sign in to access SLAI and other TRAIL Lab tools"
        onSubmit={() => {}}
        onGoogle={() => {}}
        forgotPasswordHref="#"
        signupHref="#"
      />
    ),
  },
}
