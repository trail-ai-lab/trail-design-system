import type { Meta, StoryObj } from "@storybook/react-vite"

import { VerifyEmailCard } from "@/components/patterns/verify-email-card"

const meta: Meta<typeof VerifyEmailCard> = {
  title: "Patterns/Auth/VerifyEmailCard",
  component: VerifyEmailCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    email: "teacher@school.edu",
    onResend: () => {},
    onCheck: () => {},
    onLogin: () => {},
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
type Story = StoryObj<typeof VerifyEmailCard>

export const Default: Story = {}

export const Cooldown: Story = {
  args: { sentOnce: true, cooldownSeconds: 24 },
}

export const SentAgain: Story = { args: { sentOnce: true } }

export const Checking: Story = { args: { checking: true } }

export const LinkProcessing: Story = { args: { linkProcessing: true } }

export const NoSession: Story = { args: { email: undefined } }

/** No link sent yet (e.g. an unverified sign-in): offers to send one. */
export const NotSentYet: Story = { args: { linkSent: false } }
