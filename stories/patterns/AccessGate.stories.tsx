import type { Meta, StoryObj } from "@storybook/react-vite"

import { AccessGate } from "@/components/patterns/access-gate"

const meta: Meta<typeof AccessGate> = {
  title: "Patterns/Auth/AccessGate",
  component: AccessGate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    status: "none",
    email: "teacher@school.edu",
    onRetry: () => {},
    onSubmit: () => {},
  },
}

export default meta
type Story = StoryObj<typeof AccessGate>

export const RequestAccess: Story = {}

export const Submitting: Story = { args: { submitting: true } }

export const SubmitFailed: Story = {
  args: { submitError: "Couldn't send your request. Try again." },
}

export const Pending: Story = { args: { status: "pending" } }

export const Unverified: Story = { args: { status: "unverified" } }

export const Loading: Story = { args: { status: "loading" } }

export const ErrorState: Story = {
  args: { status: "error", errorDetail: "The access service is unreachable." },
}
