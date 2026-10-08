import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"

const meta: Meta<typeof DeleteConfirmDialog> = {
  title: "SLAI/DeleteConfirmDialog",
  component: DeleteConfirmDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onConfirm: () => {},
    itemKind: "session",
    itemName: "Period 3 — Aug 21",
  },
}

export default meta
type Story = StoryObj<typeof DeleteConfirmDialog>

export const Default: Story = {}

export const Deleting: Story = { args: { loading: true } }

export const Group: Story = {
  args: {
    itemKind: "group",
    itemName: "Group 2",
    description:
      "Group 2 and its recording will be removed from this session. This cannot be undone.",
  },
}

export const Trigger: Story = {
  render: function WithTrigger(args) {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete…
        </Button>
        <DeleteConfirmDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    )
  },
}
