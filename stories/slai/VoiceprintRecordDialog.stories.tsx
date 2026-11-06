import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent } from "storybook/test"

import { VoiceprintRecordDialog } from "@/components/slai/voiceprint-record-dialog"

// a11y: aria-input-field-name disabled. Upstream: shadcn's Slider doesn't pass aria-label to the Radix thumb.
const A11Y = {
  config: {
    rules: [{ id: "aria-input-field-name", enabled: false }],
  },
}

const meta: Meta<typeof VoiceprintRecordDialog> = {
  title: "SLAI/VoiceprintRecordDialog",
  component: VoiceprintRecordDialog,
  tags: ["autodocs"],
  parameters: { a11y: A11Y },
  args: {
    open: true,
    onOpenChange: () => {},
    studentName: "Lucia",
  },
}

export default meta
type Story = StoryObj<typeof VoiceprintRecordDialog>

/** Recording stays disabled until the teacher confirms the student agreed. */
export const Idle: Story = {
  play: async () => {
    const start = await screen.findByRole("button", { name: "Start recording" })
    await expect(start).toBeDisabled()
    await userEvent.click(screen.getByRole("checkbox"))
    await expect(start).toBeEnabled()
  },
}

export const Starting: Story = { args: { status: "starting" } }

export const Recording: Story = { args: { status: "recording", seconds: 18 } }

export const LongEnough: Story = { args: { status: "recording", seconds: 44 } }

export const Recorded: Story = { args: { status: "recorded", seconds: 47 } }

/** Under `minSeconds`, the sample can only be recorded again. */
export const TooShort: Story = {
  args: { status: "recorded", seconds: 12 },
  play: async () => {
    await expect(
      await screen.findByRole("button", { name: "Save voiceprint" })
    ).toBeDisabled()
  },
}

export const Saving: Story = { args: { status: "saving", seconds: 47 } }

export const MicrophoneBlocked: Story = {
  args: { error: "Microphone access denied." },
}
