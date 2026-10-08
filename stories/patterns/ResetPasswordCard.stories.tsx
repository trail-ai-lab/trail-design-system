import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResetPasswordCard } from "@/components/patterns/reset-password-card"

const meta: Meta<typeof ResetPasswordCard> = {
  title: "Patterns/Auth/ResetPasswordCard",
  component: ResetPasswordCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { status: "ready", onSubmit: () => {}, onRequestNewLink: () => {} },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ResetPasswordCard>

/** Type a short or mismatched password to see inline validation. */
export const Ready: Story = {}

export const Validating: Story = { args: { status: "validating" } }

export const Invalid: Story = { args: { status: "invalid" } }

export const Submitting: Story = { args: { status: "submitting" } }

export const Done: Story = { args: { status: "done" } }
