import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"

const meta: Meta<typeof ConfirmDialog> = {
  title: "Patterns/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof ConfirmDialog>

/** Destructive (default): data is lost or something can't be undone. */
export const Destructive: Story = {
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="destructive">End session</Button>}
      title="End this session?"
      description="Recording stops for every group and students are disconnected."
      confirmLabel="End session"
      onConfirm={() => {}}
    />
  ),
}

/** `variant="default"`: disruptive but safe, e.g. replacing an invite link. */
export const Default: Story = {
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="outline">Generate new link</Button>}
      variant="default"
      title="Generate a new link?"
      description="The current link and QR code will stop working."
      confirmLabel="Generate new link"
      onConfirm={() => {}}
    />
  ),
}

/** Controlled with `loading`: stays open with a spinner until the work finishes. */
export const Loading: Story = {
  render: function LoadingStory() {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete recording
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete recording"
          description='"Inclined Plane Lab" will be permanently deleted.'
          confirmLabel="Delete"
          loadingLabel="Deleting…"
          loading={loading}
          onConfirm={() => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setOpen(false)
            }, 1500)
          }}
        />
      </>
    )
  },
}
