import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import { SessionDestinationFields } from "@/components/slai/session-destination-fields"
import { DESTINATION_CLASSES } from "./_destination-fixtures"

const meta: Meta<typeof SessionDestinationFields> = {
  title: "SLAI/SessionDestinationFields",
  component: SessionDestinationFields,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { classes: DESTINATION_CLASSES },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SessionDestinationFields>

/** Pick a class, then a session; "+ New …" reveals a name input. */
export const Default: Story = {}

/** A new class always gets a new session, with an optional date. */
export const NewClass: Story = {
  play: async ({ canvas, userEvent }) => {
    const [classSelect] = canvas.getAllByRole("combobox")
    await userEvent.click(classSelect)
    await userEvent.click(
      await screen.findByRole("option", { name: "+ New class" })
    )
    await expect(canvas.getByLabelText("New session name")).toBeVisible()
  },
}

/** No classes yet: only "+ New class" is offered. */
export const NoClasses: Story = { args: { classes: [] } }

export const Disabled: Story = { args: { disabled: true } }
