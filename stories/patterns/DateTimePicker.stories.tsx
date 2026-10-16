import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DateTimePicker } from "@/components/patterns/date-time-picker"

const meta: Meta<typeof DateTimePicker> = {
  title: "Patterns/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  args: { "aria-label": "Session date" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DateTimePicker>

/** Nothing picked: the placeholder shows until a day is chosen. */
export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: new Date(2026, 7, 21, 10, 30) },
}

/** `clearable` adds a × button while a date is picked. */
export const Clearable: Story = {
  render: function ClearableStory(args) {
    const [value, setValue] = React.useState<Date | null>(
      new Date(2026, 7, 21, 10, 30)
    )
    return (
      <DateTimePicker
        {...args}
        clearable
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: new Date(2026, 7, 21, 10, 30) },
}
