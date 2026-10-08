import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import {
  SaveRecordingDialog,
  type SaveRecordingPhase,
} from "@/components/slai/save-recording-dialog"

const meta: Meta<typeof SaveRecordingDialog> = {
  title: "SLAI/SaveRecordingDialog",
  component: SaveRecordingDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    phase: "form",
    durationSeconds: 754,
    sizeBytes: 4_400_000,
    defaultFilename: "recording-2026-08-21.webm",
    languageOptions: DEFAULT_LANGUAGES,
    onUpload: () => {},
    onDiscard: () => {},
    onNewRecording: () => {},
    onRetryUpload: () => {},
  },
}

export default meta
type Story = StoryObj<typeof SaveRecordingDialog>

export const Form: Story = {}

export const Uploading: Story = {
  args: { phase: "uploading", uploadAttempt: 2, uploadTotalAttempts: 4 },
}

export const Done: Story = { args: { phase: "done" } }

export const Failed: Story = {
  args: { phase: "error", errorMessage: "The connection dropped." },
}

/** Simulates the full flow: form, upload with retries, then done. */
export const FullFlow: Story = {
  render: function Flow(args) {
    const [open, setOpen] = React.useState(false)
    const [phase, setPhase] = React.useState<SaveRecordingPhase>("form")
    const [attempt, setAttempt] = React.useState(1)

    const upload = () => {
      setPhase("uploading")
      setAttempt(1)
      setTimeout(() => setAttempt(2), 1200)
      setTimeout(() => setPhase("done"), 2400)
    }

    return (
      <>
        <Button
          onClick={() => {
            setPhase("form")
            setOpen(true)
          }}
        >
          Stop and save
        </Button>
        <SaveRecordingDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          phase={phase}
          uploadAttempt={attempt}
          uploadTotalAttempts={4}
          onUpload={upload}
          onDiscard={() => setOpen(false)}
          onNewRecording={() => setOpen(false)}
        />
      </>
    )
  },
}
