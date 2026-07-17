import type { Meta, StoryObj } from "@storybook/nextjs"

import { NewSessionForm } from "@/components/slai/new-session-form"

const CLASSES = [
  "Bio 1",
  "Biology",
  "Gravity",
  "Mathematics",
  "Physics",
  "Pune",
  "Science",
  "Science 23",
]

const meta: Meta<typeof NewSessionForm> = {
  title: "SLAI/NewSessionForm",
  component: NewSessionForm,
  tags: ["autodocs"],
  args: {
    classes: CLASSES,
    className: "w-full max-w-xl",
  },
}

export default meta
type Story = StoryObj<typeof NewSessionForm>

export const Default: Story = {}

export const WithClassPreselected: Story = {
  args: { defaultClass: "Physics" },
}
