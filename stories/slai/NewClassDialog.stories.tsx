import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent } from "storybook/test"

import { NewClassDialog } from "@/components/slai/new-class-dialog"

const meta: Meta<typeof NewClassDialog> = {
  title: "SLAI/NewClassDialog",
  component: NewClassDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: () => {},
    takenNames: ["Physics", "Biology"],
  },
}

export default meta
type Story = StoryObj<typeof NewClassDialog>

export const Default: Story = {}

/** A class already has the typed name (ignoring case and spacing), so Create is disabled. */
export const NameTaken: Story = {
  play: async () => {
    await userEvent.type(
      await screen.findByLabelText("Class name"),
      " physics "
    )
    await expect(
      await screen.findByText("This class already exists.")
    ).toBeVisible()
    await expect(
      screen.getByRole("button", { name: "Create class" })
    ).toBeDisabled()
  },
}

export const Creating: Story = { args: { loading: true } }

export const Failed: Story = {
  args: { error: "Couldn't create the class. Please try again." },
}
