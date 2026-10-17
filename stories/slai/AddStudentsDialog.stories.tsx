import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import { Button } from "@/components/ui/button"
import { AddStudentsDialog } from "@/components/slai/add-students-dialog"

const meta: Meta<typeof AddStudentsDialog> = {
  title: "SLAI/AddStudentsDialog",
  component: AddStudentsDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: () => {},
    klass: "Physics",
  },
}

export default meta
type Story = StoryObj<typeof AddStudentsDialog>

export const Default: Story = {}

/** Pasted names are counted as they're typed; the button says how many. */
export const WithNames: Story = {
  play: async ({ userEvent }) => {
    // The dialog renders in a portal, outside the story canvas
    const body = await screen.findByLabelText("Names")
    await userEvent.type(body, "Mei{Enter}Liam{Enter}Rosa")
    await expect(
      screen.getByRole("button", { name: "Add 3 students" })
    ).toBeEnabled()
  },
}

export const Adding: Story = { args: { loading: true } }

export const Trigger: Story = {
  render: function WithTrigger(args) {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add students</Button>
        <AddStudentsDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    )
  },
}
