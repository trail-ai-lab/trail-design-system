import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

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
    title: "Rename source",
    currentName: "Inclined Plane Lab",
    extension: ".mp3",
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
