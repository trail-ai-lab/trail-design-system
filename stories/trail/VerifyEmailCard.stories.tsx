import type { Meta, StoryObj } from "@storybook/nextjs"

import { VerifyEmailCard } from "@/components/trail/verify-email-card"

const meta: Meta<typeof VerifyEmailCard> = {
  title: "Trail/Auth/VerifyEmailCard",
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
