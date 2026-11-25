import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import { StandardPicker } from "@/components/slai/standard-picker"
import { STANDARDS } from "./_standard-fixtures"

const meta: Meta<typeof StandardPicker> = {
  title: "SLAI/StandardPicker",
  component: StandardPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    standards: STANDARDS,
    "aria-label": "Session standard",
    noneLabel: "No standard",
    value: null,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StandardPicker>

export const Default: Story = {}

export const Chosen: Story = { args: { value: "7.RP.2a" } }

export const Loading: Story = { args: { standards: [], loading: true } }

/** Opens on `defaultGrade`; the grade switch lists another grade. */
export const SwitchGrade: Story = {
  args: { defaultGrade: 7 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"))
    await expect(await screen.findByText("7.RP.1")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("radio", { name: "6" }))
    await expect(await screen.findByText("6.RP.1")).toBeInTheDocument()
    await expect(screen.queryByText("7.RP.1")).not.toBeInTheDocument()
  },
}

/** Typing searches every grade. */
export const SearchEveryGrade: Story = {
  args: { defaultGrade: 7 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"))
    await userEvent.type(
      await screen.findByPlaceholderText(/search every grade/i),
      "ratio"
    )
    await expect(await screen.findByText("6.RP.1")).toBeInTheDocument()
    await expect(screen.getByText("7.RP.1")).toBeInTheDocument()
  },
}

/** Controlled: the choice shows on the trigger. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | null>(null)
    return <StandardPicker {...args} value={value} onValueChange={setValue} />
  },
}
