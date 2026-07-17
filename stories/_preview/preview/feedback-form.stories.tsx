// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/feedback-form.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { FeedbackForm } from "@/components/blocks/preview/cards/feedback-form"

const meta: Meta<typeof FeedbackForm> = {
  title: "_Preview/Preview/FeedbackForm",
  component: FeedbackForm,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof FeedbackForm>

export const Default: Story = {}
