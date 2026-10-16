import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { MoveToSessionDialog } from "@/components/slai/move-to-session-dialog"
import { DESTINATION_CLASSES } from "./_destination-fixtures"

const meta: Meta<typeof MoveToSessionDialog> = {
  title: "SLAI/MoveToSessionDialog",
  component: MoveToSessionDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: () => {},
    recordingName: "Inclined Plane Lab",
    classes: DESTINATION_CLASSES,
    defaultSessionDate: new Date(2026, 7, 21, 10, 30),
  },
}

export default meta
type Story = StoryObj<typeof MoveToSessionDialog>

export const Default: Story = {}

export const Moving: Story = { args: { loading: true } }

export const Failed: Story = {
  args: { error: "That session is still running. End it first." },
}

export const Trigger: Story = {
  render: function WithTrigger(args) {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Move to session…
        </Button>
        <MoveToSessionDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    )
  },
}
