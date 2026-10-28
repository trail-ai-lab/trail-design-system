import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import { Button } from "@/components/ui/button"
import { RenameDialog } from "@/components/slai/rename-dialog"

const meta: Meta<typeof RenameDialog> = {
  title: "SLAI/RenameDialog",
  component: RenameDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: () => {},
    title: "Rename session",
    currentName: "Period 3 — Aug 21",
  },
}

export default meta
type Story = StoryObj<typeof RenameDialog>

export const Default: Story = {}

/** The extension is fixed and re-appended to the submitted name. */
export const SourceWithExtension: Story = {
  args: {
    title: "Rename recording",
    currentName: "Inclined Plane Lab",
    extension: ".mp3",
  },
}

/** Another class already uses the typed name (ignoring case and spacing), so Save is disabled. */
export const NameTaken: Story = {
  args: {
    title: "Rename class",
    currentName: "Chemistry",
    takenNames: ["Physics", "Biology"],
  },
  play: async ({ userEvent }) => {
    const input = await screen.findByLabelText("Name")
    await userEvent.clear(input)
    await userEvent.type(input, " physics ")
    await expect(
      await screen.findByText("That name is already in use.")
    ).toBeVisible()
    await expect(screen.getByRole("button", { name: "Save" })).toBeDisabled()
  },
}

export const Saving: Story = { args: { loading: true } }

export const Trigger: Story = {
  render: function WithTrigger(args) {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Rename…
        </Button>
        <RenameDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    )
  },
}
